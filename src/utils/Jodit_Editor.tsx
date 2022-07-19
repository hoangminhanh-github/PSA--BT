import * as React from 'react'
import JoditReact from 'jodit-react-ts'
import 'jodit/build/jodit.min.css'

const Jodit_Editor = () => {
  const [value, setValue] = React.useState<string>()

  return (
    <div className="jodit">
      <JoditReact onChange={(content) => setValue(content)} defaultValue="Hi" />
    </div>
  )
}

export default Jodit_Editor
