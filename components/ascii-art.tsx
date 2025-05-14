interface AsciiArtProps {
  art: "avatar" | "logo" | "computer"
  className?: string
}

export default function AsciiArt({ art, className = "" }: AsciiArtProps) {
  let asciiContent = ""

  switch (art) {
    case "avatar":
      asciiContent = `
      .---.
     /     \\
    | o _ o |
    |  \\_/  |
     \\_____/
      `
      break
    case "logo":
      asciiContent = `
  _____                    _             _ 
 |_   _|__ _ __ _ __ ___ (_)_ __   __ _| |
   | |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
   | |  __/ |  | | | | | | | | | | (_| | |
   |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
      `
      break
    case "computer":
      asciiContent = `
       .----.
      /      \\
      |  o  o|
      |   -  |
      |      |
      '------'
      `
      break
    default:
      asciiContent = ""
  }

  return <pre className={`text-green-500 font-mono ${className}`}>{asciiContent}</pre>
}
