
import React, { useState, useRef } from 'react'
import axios from "axios"

function Image() {

    const productId = useRef()
    const name = useRef()
    const size = useRef()
    const rating = useRef()
    const manufacturer = useRef()
    const color = useRef()
    const packageDimensions = useRef()
    const desc = useRef()
    const materialType = useRef()
    const itemWeight = useRef()
    const brand = useRef()
    const modelNumber = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData();

        formData.append(
            "file",
            file,
            file.name
        );

        await axios.post("http://localhost:8000/api/products/add", {file: file, name: file.name, 
        productId: productId.current.value, name: name.current.value, desc: desc.current.value, size: size.current.value, rating: rating.current.value,
    brand: brand.current.value, color: color.current.value, modelNumber: modelNumber.current.value, itemWeight: itemWeight.current.value,
    materialType: materialType.current.value, packageDimensions: packageDimensions.current.value}, {
            headers: {
            "Content-type": "multipart/form-data",
        },
        })
    }

    return (
        <>
            <form onSubmit={(e) => {handleSubmit(e)}} encType="multipart/form-data" style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <label for="productId">Product Id</label>
                    <input ref={productId} type="text" id="productId" placeholder="Name"
                        name="productId" />
                </div>
                <div>
                    <label for="desc">Image Description</label>
                    <input ref={desc} type="text" id="desc" placeholder="Desc"
                        name="desc" />
                </div>
                <div>
                    <label for="name">Name</label>
                    <input ref={name} type="text" id="name" placeholder="name"
                        name="name" />
                </div>
                <div>
                    <label for="rating">Rating</label>
                    <input ref={rating} type="text" id="rating" placeholder="rating"
                        name="rating" />
                </div>
                <div>
                    <label for="manufacturer">manufacturer</label>
                    <input ref={manufacturer} type="text" id="manufacturer" placeholder="manufacturer"
                        name="manufacturer" />
                </div>
                <div>
                    <label for="brand">brand</label>
                    <input ref={brand} type="text" id="brand" placeholder="brand"
                        name="brand" />
                </div>
                <div>
                    <label for="modelNumber">modelNumber</label>
                    <input ref={modelNumber} type="text" id="modelNumber" placeholder="modelNumber"
                        name="modelNumber" />
                </div>
                <div>
                    <label for="packageDimensions">packageDimensions</label>
                    <input ref={packageDimensions} type="text" id="packageDimensions" placeholder="packageDimensions"
                        name="packageDimensions" />
                </div>
                <div>
                    <label for="color">color</label>
                    <input ref={color} type="text" id="color" placeholder="color"
                        name="color" />
                </div>
                <div>
                    <label for="materialType">materialType</label>
                    <input ref={materialType} type="text" id="materialType" placeholder="materialType"
                        name="materialType" />
                </div>
                <div>
                    <label for="size">size</label>
                    <input ref={size} type="text" id="size" placeholder="size"
                        name="size" />
                </div>
                <div>
                    <label for="itemWeight">itemWeight</label>
                    <input ref={itemWeight} type="text" id="itemWeight" placeholder="itemWeight"
                        name="itemWeight" />
                </div>
                <div>
                    <label for="image">Upload Image</label>
                    <input type="file" id="image"
                        name="image" onChange={(e) => {setFile(e.target.files[0]); console.log(e)}} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <img className='fake'></img>
        </>
    )
}

export default Image