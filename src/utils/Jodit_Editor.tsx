import * as React from 'react'
import JoditReact from 'jodit-react-ts'
import 'jodit/build/jodit.min.css'

const Jodit_Editor = (props: { defaultValues?: string | undefined }) => {
  const defaultValue = props.defaultValues
  console.log(defaultValue)
  const [value, setValue] = React.useState<string>()

  return (
    <div className="jodit">
      <JoditReact onChange={(content) => setValue(content)} defaultValue={defaultValue ? defaultValue : 'hehe'} />
    </div>
  )
}

export default Jodit_Editor
