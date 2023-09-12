export const newDateComment = () => {
  const now = new Date();
  
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
}

export function getEnvValue(envName) {
  try {
    const _envName = 'VITE_' + String(envName).toUpperCase()
    return import.meta.env[_envName]
  } catch (error) {
    console.warn('Not found env variable:', envName)
  }
}