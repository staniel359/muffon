import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export function set (
  value
) {
  const info = {
    nickname: value.nickname,
    email: value.email,
    role: value.role,
    private: value.private,
    image: value.image,
    gender: value.gender,
    birthdate: value.birthdate,
    country: value.country,
    city: value.city,
    status: value.status
  }

  const connections = value.connections

  const isSaveActivity = value.save_activity_history

  return updateGlobalStore(
    {
      'profile.info': info,
      'profile.connections': connections,
      'history.isSaveActivity': isSaveActivity
    }
  )
}

export function reset () {
  return updateGlobalStore(
    {
      'profile.id': null,
      'profile.info': null,
      'profile.connections': null
    }
  )
}
