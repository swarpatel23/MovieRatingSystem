import React, { useEffect,useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
// const images = [
//     {
//       original: 'https://picsum.photos/id/1018/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1018/250/150/',
//     },
//     {
//       original: 'https://picsum.photos/id/1015/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1015/250/150/',
//     },
//     {
//       original: 'https://picsum.photos/id/1019/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1019/250/150/',
//     },
//   ];
const PhotosComp = ({list})=>{
    const [images, setImages] = useState([]);
    useEffect(() => {
        let imglist = [];
        list.forEach(image => {
            let temp = {
                original: image.src,
                thumbnail: image.msrc,
                originalAlt: image.altText,
                thumbnailAlt: image.altText
            };
            imglist.push(temp);
        });
        setImages(imglist);
    }, [list])
    return(
        <div >
               <ImageGallery items={images} style={{maxHeight:'50vh'}} lazyLoad={true} infinite={true}/>
        </div>
    )
}
export default PhotosComp;