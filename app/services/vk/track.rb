module VK
  class Track < Muffon::Base
    VK_STR = 'abcdefghijklmnopqrstuvwxyz'\
      'ABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/='.freeze

    def call
      return unless @args.vk_id.present?
      return unless link.present?

      retrieve_track
    end

  private

    def retrieve_track
      encoded_values = link.split('=')[1].split('#')
      first = vk_o(encoded_values[0])
      second = vk_o(encoded_values[1]).split("\v")
      vk_s(first, second[1].to_i ^ 223_233_444)
    end

    def link
      @link ||= RestClient.post(
        'https://vk.com/al_audio.php',
        request_params, cookies: { remixsid: remixsid }
      ).body.delete('\\').split('"')[1]
    end

    def request_params
      { act: 'reload_audio', al: 1, ids: @args.vk_id }
    end

    def remixsid
      secrets[:vk][:remixsid][Rails.env.to_sym]
    end

    def vk_o(string)
      result = []
      index2 = i = 0
      string.split('').each do |s|
        if div_four(index2)
          (i = sym_index(s) + (i << 6)) && (index2 += 1)
          result << chr(i, shift(index2))
        else
          (i = sym_index(s)) && (index2 += 1)
        end
      end && result.join
    end

    def div_four(num)
      num % 4 != 0
    end

    def sym_index(sym)
      VK_STR.index(sym)
    end

    def shift(index2)
      -2 * index2 & 6
    end

    def chr(char, shift)
      [(0xFF & (char >> shift)).chr]
    end

    def vk_s(first, second)
      l = first.length
      return first unless l.positive?

      o = vk_s_child(first, second)
      first = first.split('')
      (1...l).each do |a|
        b = o[l - 1 - a]
        first[a], first[b] = first[b], first[a]
      end
      first.join
    end

    def vk_s_child(first, second)
      l = first.length
      return [] unless l.positive?

      o = []
      (l - 1).downto(0).each do |a|
        second = (l * (a + 1) ^ second + a) % l
        o.append(second)
      end
      o.reverse
    end
  end
end
