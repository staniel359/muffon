module Vk
  class GetTrack < Service
    VK_STR = 'abcdefghijklmnopqrstuvwxyz'\
      'ABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/='.freeze

    def call
      retrieve_track
    end

  private

    def retrieve_track
      return unless link.present?

      encoded_values = link.split('=')[1].split('#')

      first = vk_o(encoded_values[0])
      second = vk_o(encoded_values[1]).split("\v")

      vk_s(first, second[1].to_i ^ 223_233_444)
    end

    def link
      return nil unless @args.vk_id.present?

      @link ||= RestClient.post(
        'https://vk.com/al_audio.php',
        { act: 'reload_audio', al: 1, ids: @args.vk_id },
        cookies: { remixsid: ENV['VK_REMIXSID'] }
      ).body.delete('\\').split('"')[1]
    end

    def vk_o(string)
      result = []
      index2 = 0
      i = 0

      string.split('').each do |s|
        next if sym_index(s) == -1

        if index2 % 4 != 0
          i = (i << 6) + sym_index(s)
          index2 += 1
          shift = -2 * index2 & 6
          result += [(0xFF & (i >> shift)).chr]
        else
          i = sym_index(s)
          index2 += 1
        end
      end

      result.join
    end

    def sym_index(s)
      VK_STR.index(s)
    end

    def vk_s(t, e)
      l = t.length

      return t unless l.positive?

      o = vk_s_child(t, e)
      t = t.split('')

      (1...l).each do |a|
        t[a], t[o[l - 1 - a]] = t[o[l - 1 - a]], t[a]
      end

      t.join
    end

    def vk_s_child(t, e)
      l = t.length

      return [] unless l.positive?

      o = []

      (l - 1).downto(0).each do |a|
        e = (l * (a + 1) ^ e + a) % l
        o.append(e)
      end

      o.reverse
    end
  end
end
