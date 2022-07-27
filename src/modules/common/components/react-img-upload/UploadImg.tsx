import React, { memo } from 'react'
import { AiFillCamera, AiFillDelete } from 'react-icons/ai'
import { BsXOctagonFill } from 'react-icons/bs'
import ImageUploading, { ImageListType } from 'react-images-uploading'
export function UploadImg({ formik }: any) {
  const [images, setImages] = React.useState([])
  const maxNumber = 69

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    // console.log(imageList, addUpdateIndex)
    setImages(imageList as never[])
    setImagesList(imageList)
  }
  const setImagesList = (e: any) => {
    const imgList = e?.map((value: any) => {
      return value?.file.name
    })
    formik.values.imagesOrder = imgList
    // setImgList(imgList)
  }
  return (
    <div className="App">
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper" style={{ display: 'flex' }}>
            <button
              style={
                isDragging
                  ? { display: 'none' }
                  : { width: ' 100px', height: '100px', backgroundColor: 'transparent', border: '1px dashed white' }
              }
              onClick={onImageUpload}
              {...dragProps}
            >
              <AiFillCamera style={{ color: 'white' }}></AiFillCamera>
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            <div style={{ display: 'flex' }}>
              {imageList.map((image, index) => (
                <>
                  <div
                    key={index}
                    className="image-item"
                    style={{ display: 'inline-block', paddingRight: '10px', border: '1px solid white' }}
                  >
                    <img src={image.dataURL} alt="" width="100" />
                    {/* <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div> */}
                  </div>
                  <BsXOctagonFill onClick={() => onImageRemove(index)}></BsXOctagonFill>
                </>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
export default memo(UploadImg)
