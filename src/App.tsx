import { Icon } from './components/Icon'
import { Draggable } from './components/Draggable'
import './App.css'
import React from 'react'
import { ThemeToggleIcon } from './components/ThemeToggleIcon/'
import { getRandomSpinSpeed } from './utils/useGetRandomSpinSpeed'

export const App: React.FC = () => {
  const [isCanUploadFile, setIsCanUploadFile] = React.useState<boolean>(true)
  const [count, setCount] = React.useState<string>('1')
  const [isUploadedFiles, setIsUploadedFiles] = React.useState<(string | ArrayBuffer)[]>([])

  const handleCountChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setCount(e.target.value)
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      setIsUploadedFiles([])
      return
    }
    // 数値以外が入力されていたら、１にする
    if (isNaN(Number(count)) || !e.target.value) {
      setCount('1')
    }

    // アップロードボタンを消す
    setIsCanUploadFile(false)

    const files = e.target.files
    const Uploadedfiles: (string | ArrayBuffer)[] = []
    for (const file of files) {
      // ファイルを読み込み、Base64形式のデータURLに変換
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          Uploadedfiles.push(reader.result)
          if (Uploadedfiles.length === files.length) {
            setIsUploadedFiles(Uploadedfiles)
          }
        }
      }
      reader.onerror = () => {
        alert('ファイルの読み込み中にエラーが発生しました。リトライしてください')
      }

      // 読み込み開始
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-full max-w-[1280] items-center justify-center bg-base-white dark:bg-base-black">
      <main>
        {isCanUploadFile && (
          <form className="box-content rounded-md bg-white p-20 shadow-md">
            <div className="mb-8 flex justify-center">
              <ThemeToggleIcon className="flex items-center justify-between" />
            </div>
            <label className="mt-4 block">
              <span className="sr-only">ファイルを選択</span>
              <input
                type="file"
                aria-label="アップロードするファイルを選択する"
                className="block w-full cursor-pointer text-sm
                  text-slate-500 file:mr-4 file:rounded-full file:border-0
                  file:bg-violet-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-violet-700
                hover:file:bg-violet-100"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <label className="mt-4 flex justify-center text-justify">
              <span className="text-lg font-bold">× </span>
              <input
                type="text"
                aria-label="アップロードしたファイルの数の何倍が表示されるかを選択する"
                className="ml-4 w-10 rounded-lg bg-blue-50 px-2 font-bold text-blue-700"
                value={count}
                onChange={handleCountChange}
                autoComplete="off"
              />
            </label>
          </form>
        )}

        {isUploadedFiles?.map((image, i) => {
          return <UploadFiles image={image} key={String(image) + i} count={count} />
        })}
      </main>
    </div>
  )
}

const UploadFiles: React.FC<{ image: string | ArrayBuffer; count: string }> = (props) => {
  const Component = Array.from({ length: Number(props.count) }, (_, i) => {
    const randomSpinSpeed = getRandomSpinSpeed()
    return (
      <Draggable key={String(props.image) + i}>
        <Icon src={String(props.image)} className={`box-border ` + randomSpinSpeed} />
      </Draggable>
    )
  })
  return Component
}
export default App
