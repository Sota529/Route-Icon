import { Icon } from './components/Icon'
import { Draggable } from './components/Draggable'
import './App.css'
import React from 'react'
import { ThemeToggleIcon } from './components/ThemeToggleIcon/'

export const App = () => {
  const [isCanUploadFile, setIsCanUploadFile] = React.useState<boolean>(true)
  const [count, setCount] = React.useState<string>('1')
  const [uploadedFiles, setUploadedFiles] = React.useState<(string | ArrayBuffer)[]>([])

  const handleCountChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setCount(e.target.value)
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      setUploadedFiles([])
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
            setUploadedFiles(Uploadedfiles)
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

  const Multi: React.FC<{ image: string | ArrayBuffer }> = (props) => {
    const Component = Array.from({ length: Number(count) }, (_, i) => (
      <Draggable key={String(props.image) + i}>
        <Icon src={String(props.image)} className="box-border animate-spin" />
      </Draggable>
    ))
    return Component
  }

  return (
    <div className="flex h-full max-w-[1280] items-center justify-center">
      <main>
        {isCanUploadFile && (
          <form className="box-content rounded-md p-20 shadow-md ">
            <div className="mb-8 flex justify-center">
              <ThemeToggleIcon className="flex items-center justify-between" />
            </div>
            <label id="files" className="mt-4 block">
              <span className="sr-only">ファイルを選択</span>
              <input
                id="files"
                type="file"
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
            <label id="count" className="mt-4 flex justify-center text-justify">
              <span className="text-lg font-bold">× </span>
              <input
                id="count"
                type="text"
                className="ml-4 w-10 rounded-md bg-blue-100 px-2 text-blue-500"
                value={count}
                onChange={handleCountChange}
              />
            </label>
          </form>
        )}

        {uploadedFiles?.map((image, i) => {
          return <Multi image={image} key={String(image) + i} />
        })}
      </main>
    </div>
  )
}

export default App
