import { Icon } from './components/Icon'
import { Draggable } from './components/Draggable'
import './App.css'
import React from 'react'

export const App = () => {
  const [isCanUploadFile, setIsCanUploadFile] = React.useState<boolean>(true)
  const [uploadedFiles, setUploadedFiles] = React.useState<(string | ArrayBuffer)[]>([])

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      setUploadedFiles([])
      return
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

  return (
    <div className="app">
      <main>
        {isCanUploadFile && (
          <form className="flex items-center space-x-6">
            <label className="block">
              <span className="sr-only">ファイルを選択</span>
              <input
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
          </form>
        )}
        {uploadedFiles?.map((image) => {
          return (
            <Draggable key={String(image)}>
              <Icon src={String(image)} className="box-border animate-spin" />
            </Draggable>
          )
        })}
      </main>
    </div>
  )
}

export default App
