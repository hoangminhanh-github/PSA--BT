import * as React from 'react'
import JoditReact from 'jodit-react-ts'
import 'jodit/build/jodit.min.css'

const Jodit_Editor = (props: { defaultValues?: string | undefined; formik?: any }) => {
  const formik = props.formik
  const defaultValue = props.defaultValues
  const [value, setValue] = React.useState<string>()

  const handleChange = (content: string) => {
    setValue(content)
  }
  // formik.values.description = value
  if (formik) {
    formik.values.description = value
  }

  return (
    <div className="jodit">
      <JoditReact onChange={(content) => handleChange(content)} defaultValue={defaultValue ? defaultValue : 'hehe'} />
    </div>
  )
}

export default Jodit_Editor
