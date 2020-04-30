
import { copy, replaceContent } from 'aria-build'

function replace(filename: string) {
  return replaceContent({ filename, strToFind: '../src',  strToReplace: '../aria-serve' })
}

export default {
  plugins: [
    copy({
      targets: [
        { src: './bin/*', dest: './dist/bin', replace } 
      ]
    })
  ]
}