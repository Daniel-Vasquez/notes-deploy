export function getEnvValue(envName) {
  try {
    const _envName = 'VITE_' + String(envName).toUpperCase()
    return import.meta.env[_envName]
  } catch (error) {
    console.warn('Not found env variable:', envName)
  }
}