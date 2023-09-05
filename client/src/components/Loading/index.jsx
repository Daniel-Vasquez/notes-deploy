import styleLoading from './index.module.css'

export const Loading = () => {
  return (
    <div className={styleLoading.container}>
      <div className={styleLoading.loader}></div>
    </div>
  )
}
