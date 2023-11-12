import { SpinSppedType } from '../types/SpinSppedType'

export const useGetRandomSpinSpeed = (count: number) => {
  const seedList: string[] = []
  for (let i = 0; i <= count; i++) {
    const seed = createSpinSppedKey()
    seedList[i] = spinSppedMap[seed] ?? `animate-` + `[spin_.1s_linear_infinite]`
  }

  return seedList
}

const spinSppedMap: SpinSppedType = {
  1: `animate-` + `[spin_1s_linear_infinite]`,
  0.5: `animate-` + `[spin_0.5s_linear_infinite]`,
  0.1: `animate-` + `[spin_.1s_linear_infinite]`
}

const createSpinSppedKey = (): keyof SpinSppedType => {
  const randomValue = Math.random()

  if (randomValue < 0.33) {
    return 0.1
  } else if (randomValue < 0.66) {
    return 0.5
  } else {
    return 1
  }
}
