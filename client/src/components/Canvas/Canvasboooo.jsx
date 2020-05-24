import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = (
      {
        canWidth: this.props.width,
        canHeight: this.props.height,
      }
    );
  }
  componentDidMount() {
    console.log(this.state.canWidth, this.state.canHeight);
    this.setState(
      {
        uploadedImage: this.props.uploadedImage,
        canWidth: this.props.width,
        canHeight: this.props.height,
      }, () => {
      let uploadData = new Promise(this.createObjects)
        .then(() => {
          console.log(uploadData);  
        });
      }
    )

  }
  // THE PROBLEM IS HERE AT THE MOMENT 
  // Lessons learned:
    // Don't use promises it just makes everything more complicated
  // getImageData() -> var = imageData.data -> mutate var -> putImageData()
  // assign this.image.src to a new variable
    // convert from base64 to uint8
    // putImageData(uint8)
    // getImageData
    // Pass it down
  createObjects = async () => {
    console.log('creating objects: 1');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.onload = async () => {
      console.log('this.canvas', this.canvas);
      this.context.drawImage(this.image, 0, 0);
      // const temp = this.image;
      const temp = fetch(this.canvas.toDataURL('image/png', 1))
        .then((res) => {
          console.log(res);
          return res.arrayBuffer();
        })
        .then((buffer) => {
          console.log(buffer);
          // console.log(new Uint8Array(buffer));
          return new Uint8ClampedArray(buffer); // Generated array does not have the same byte size as input watdo?
        })
        .then((clampedArray) => {
          const image = new ImageData(clampedArray, this.image.width, this.image.height);
          this.context.putImageData(image, 0, 0); // use putImageData after making changes?
          const imageData = this.context.getImageData(0, 0, this.image.width, this.image.height); // Dimensions are currently hard coded 
          console.log('done creating objects: 1', imageData);
          this.setState(
            {
              imageData: imageData,                  
            }, () => {
              console.log('about to pass imagedata to 2', this.state.imageData);
            }
          );
        })
        .catch((e) => {
          throw e;
        })
      }
    this.image.src = this.state.uploadedImage; // Lives at base64 jpeg
  }

  // TODO: Determine majority color and then filter that color out, but for now just do black
  // async updateImageData() {
  //     console.log(imageData);
  //     console.log('Getting uploaded imagedata: 2');
  //     let pixelIsThere = false;
  //     for (let i = 0; i < imageData.data.length; i++) {
  //       console.log(imageData.data[i], imageData.data[i] > 0);
  //       if (imageData.data[i] !== 0) {
  //         console.log('found a non zero pixel');
  //         pixelIsThere = true;
  //         break;
  //       }
  //       if (imageData.data[i] > 0) {
  //         console.log('holy shit a pixel exists', imageData.data[i]);
  //         pixelIsThere = true;
  //         break;
  //       } else {
  //         // console.log('nothing is here', imageData.data[i]);
  //       }
  //     }
      
  //     if (pixelIsThere) {
  //       console.log('we converted some pixels');
  //     } else {
  //       console.log('wtf something is wrong with the input bitmap')
  //     }
      
  //   console.log('returning uploaded imagedata as bitmap: 2');
  //   return imageData.data; 
  //   // imageData = this.state.imageData;
  //   // this.context.drawImage(this.image, 0, 0);
  //   // Gets imagedata as Uint8
  //   // let imageData = this.context.getImageData(0, 0, this.image.naturalWidth, this.image.naturalHeight);
  // }
  
  // async blackPassFilter() {
  //   let image = await this.updateImageData();
  //   this.test1 = image; // Pixel data of uploaded image
  //   console.log('Passing image bitmap through filter: 3');
  //   let red, blue, green, alphaVal;
  //   let numReplace = 0;
  //   let numTrack = 0;
  //   // Go through pixel by pixel, check if the pixel rgba value is equal to the track color
  //   // If not, set rgba to 0, 0, 0, 1 (black);
  //   for (let i = 0 ; i < image.length; i += 4) {
  //     red = i;
  //     blue = i + 1;
  //     green = i + 2;
  //     alphaVal = i + 3;
  //     if (
  //       ((image[red] < 60) || (image[red] > 66)) &&// Red value
  //       ((image[blue] < 60) || (image[blue] > 66)) &&// Blue value
  //       ((image[green] < 60) || (image[green] > 66))  // Green value
  //       // image[alphaVal] >= 0 // Alpha value
  //       ) {
  //         // Currently only modifying the white pixels in the background?
  //         // console.log('found a non track pixel')
  //         // console.log('converted colored pixel to white',image[red], image[blue], image[green], image[alphaVal]);
  //         image[red] = 255;
  //         image[blue] = 255;
  //         image[green] = 255;
  //         image[alphaVal] = 1;
  //         numReplace++;
  //       } else if (
  //         // if num is in between 60 and 65, it's a track pixel
  //         66 >= image[red] >= 60 &&
  //         66 >= image[blue] >= 60 &&
  //         66 >= image[green] >= 60 
  //         ) {
  //           // Finds about 23k track pixels
  //           console.log('found a track pixel');
  //           numTrack++;
  //         } else {
  //           console.log(image[red], image[blue], image[green], image[alphaVal]);
  //         }
  //       }
        
        
  //       console.log(numReplace, numTrack);
        
  //       this.test2 = image; // Pixel data after looping through
  //       if (this.test1 === this.test2) {
  //         console.log('kms');
  //       }
  //       let temp = new ImageData(await image, this.image.naturalWidth);
  //       this.canvas.width = this.image.naturalWidth; this.canvas.height = this.image.naturalHeight;
        
  //       void this.context.putImageData(temp, 0, 0);
        
  //       console.log('Finished processing image: 3');
        
        
  //       // let imageAsBitmap = await createImageBitmap(temp);
  //       // console.log('imageAsBitmap', imageAsBitmap);
  //       return temp;
  //     }
      
  //   setAndDraw = async () => {
  //     await this.blackPassFilter().then(() => {
  //       console.log('drawing image for the final time: 4');
  //       this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  //       // this.context.putImageData()
  //     }); 
  //     console.log('outside of the loop: 4')
      
  //   }
      
    render() {
      console.log('rendering canvas');
      return(
        <canvas id = "canvas" width = {this.state.canWidth} height = {this.state.canHeight}></canvas>
        )
      }
    }
  