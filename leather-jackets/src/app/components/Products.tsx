'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { client } from '../lib/sanity'

const Products = () => {
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(`*[_type=="product"][0]{
          name,
          price,
          discount,
          "images": images[]{asset->{_id, url}}
        }`)
        console.log("Sanity data:", data) 
        setProduct(data)
      } catch (err) {
        console.error("Sanity fetch error:", err)
      }
    }

    fetchProduct()
  }, [])

  if (!product) return <p>Loading...</p>

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-10 gap-10">
      
      {/* Left side*/}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2">
          {product.images?.map((img: any, index: number) => (
            <Image
              key={index}
              src={img.asset.url}   
              alt={`Product Image ${index + 1}`}
              width={300}
              height={400}
              className="object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col space-y-6">
        <h3 className="text-[34px] font-semibold">{product.name}</h3>

        <h1 className="text-sm">
          ${product.price}{" "}
          {product.discount ? (
            <span className="text-red-500 bg-red-100 px-1">
              SAVE {product.discount}%
            </span>
          ) : null}
        </h1>

        <p className="text-red-500 text-xs">Discount Applied in Cart*</p>

        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Color: <span className="font-semibold">{selectedColor || "Select a color"}</span>
          </label>

          <div className="flex gap-2">
            {["black", "gray", "blue", "green"].map(color => (
              <div key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full cursor-pointer 
                  ${color === "black" ? "bg-black" : color === "gray" ? "bg-gray-900" : color === "blue" ? "bg-blue-900" : "bg-green-900"}
                  ${selectedColor === color ? "ring-2 ring-blue-500" : ""}
                  hover:ring-2 hover:ring-blue-500
                `}
              ></div>
            ))}
          </div>
        </div>

        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Size: <span className="font-semibold">{selectedSize || "Select a size"}</span>
          </label>

          <div className="flex gap-2 flex-wrap">
            {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 flex items-center justify-center border cursor-pointer
                  ${selectedSize === size ? "border-black bg-gray-100" : "border-gray-300"}
                  hover:border-gray-200
                `}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex gap-2 text-white mt-4">
          <button className="bg-blue-950 px-4 py-2 w-full">ADD TO BAG - ${product.price} CAD</button>
          <button className="bg-blue-950 px-4 py-2 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Select your size and style to check for same-day delivery and pick-up availability.
        </p>
      </div>
    </div>
  )
}

export default Products
