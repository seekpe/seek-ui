/**
 * Read file async
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function readFileAsync(file: File): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    if (!(file instanceof File)) {
      return
    }

    const reader = new window.FileReader()

    reader.onload = () => {
      const buf = Buffer.from(reader.result as string, 'binary')
      resolve(`data:${file.type};base64,${buf.toString('base64')}`)
    }

    reader.onerror = reject

    reader.readAsBinaryString(file)
  })
}
