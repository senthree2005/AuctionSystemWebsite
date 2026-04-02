import React, { useEffect,useState } from 'react';
import ReactDOM from "react-dom";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';
import { NextButton } from './CarouselButtons';
import Modal from 'react-modal';
import { ToastContainer,toast } from 'react-toastify';
import { AiFillBell, AiOutlineUser } from "react-icons/ai";
import ReactImageUploading from 'react-images-uploading';
import {Account} from './AccountHandler.jsx';
import axios from "axios";



function MiniDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
          <div class="bg-indigo-950 w-100 h-40 border border-blue-400 rounded-xl grid grid-cols-2">
            <div class = "min-h-50 max-h-50 min-w-50 max-w-50 p-5">
              <div class = "grid grid-rows-2">
                <div>
                {ImageDisplay(false, <img src='/src/assets/img1.jpg'></img>)}
                </div>

                <div class="font-thin mt-2">
                  <p>Current Bid:</p>
                  <p class="font-bold text-lime-400">$10,240,000.00</p>
                </div>
              </div>
               
            </div>

            <div class="">

              <div class="p-2 overflow-y-auto min-h-25 max-h-25">
                <h2>
                  Lot for Sale
                </h2>
                <p class = "font-thin">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat id lacinia convallis. Nunc sapien lectus, laoreet tristique velit id, porttitor pellentesque ante. Curabitur malesuada eleifend velit, sed cursus ligula pretium sit amet. Phasellus rhoncus elit ut accumsan gravida. Sed accumsan mauris eget erat fringilla ullamcorper
                </p>
              </div>

              <div>
                <button command="show-modal" commandfor="info" class = " bg-blue-700 hover:bg-white hover:text-black text-white font-semibold text-xs rounded-full h-5 w-45 mt-4">Click for more information.</button>
                
              </div>
            </div>

            

          </div>
  )

}

function ImageDisplay(autoplayState, elementDisplay) {
  const autoplayOptions = { delay: 3000 }; 
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)])

    useEffect(() => {
    if (!emblaApi) return
        emblaApi.reInit()

    if(autoplayState)
      emblaApi.plugins().autoplay?.play()
    else
      emblaApi.plugins().autoplay?.stop();

  }, [emblaApi])



  const goToPrev = () => emblaApi?.scrollPrev()
  const goToNext = () => emblaApi?.scrollNext()



  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className = "embla__slide">
            {elementDisplay}
          </div>

          <div className = "embla__slide">
            {elementDisplay}
          </div>
          <div className = "embla__slide">
            {elementDisplay}
          </div>
            
        </div>
      </div>



       
    </div>
  )
}
function MiniItemDisplay() {
  return(
    <div>
      <div class="mb-5">
          <input type="text" class=" border border-indigo-600 focus:border-white focus:outline-hidden rounded-full min-w-full max-w-full min-h-10 max-h-10 px-4 py-2"placeholder='Search'></input>
      </div>
      <div class = "grid grid-cols-2 gap-x-25 gap-y-10">
        <MiniDisplay />
            <MiniDisplay />

      <MiniDisplay />

      <MiniDisplay />

      <MiniDisplay />

      <MiniDisplay />
      
      </div>
      

    </div>
  ) 
}

//  const notify = () => toast.info(
//         bidder + " Place a $" + bid_amount + " Bid! on your #" + product_id, {
//         position: "bottom-left",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         className:"border border-gray-700",
//         progress: undefined,
//         theme: "dark",
//   })

 const notify = () => toast.info(
        "User12443 Place a $4350.00",  {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        className:"border border-gray-700",
        progress: undefined,
        theme: "dark",
  })

function ItemDisplay(image) {
  return (
    <div class = "flex p-5 ml-10 z-0">
      <div class="min-h-100 max-h-100 min-w-100 max-w-100  mr-7">
        {ImageDisplay(true, image)}

        <div class="grid grid-cols-2 mt-2">
          <div>
            <p>Time Remaining: 6:23:42</p>
            <br></br>
            <div>
              <h3>Current Highest Bid: </h3>
              <h2 class="text-lime-400">$4,431.00</h2>

              <h3>Minimum Bid: </h3>
              <h2 class="text-lime-600">$4,600.00</h2>
            </div>
          </div>
          
          <div class="text-end">
            <p>Auctioneer:</p>
            <h2 class="font-thin">Cedrick C. Senados</h2>
            <br></br>

            <p>Phone Number:</p>
            <h2 class="font-thin">09662997866</h2>
          </div>
          
        </div>
      </div>



      <div class = "grid-rows-2">
        <div class="overflow-y-auto min-w-100 max-w-100 min-h-60 max-h-60">
          <h1 class="text-2xl">House and Lot for Sale 165 SQM Fully Titled Near GYM PUROK 1 LA FILIPINA
            </h1>     
            <p class="font-thin font-sans"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat id lacinia convallis. Nunc sapien lectus, laoreet tristique velit id, porttitor pellentesque ante. Curabitur malesuada eleifend velit, sed cursus ligula pretium sit amet. Phasellus rhoncus elit ut accumsan gravida. Sed accumsan mauris eget erat fringilla ullamcorper. Pellentesque placerat tellus at diam dapibus, quis porttitor nunc elementum. Nam tortor purus, volutpat vel tempus facilisis, ultrices sollicitudin nunc. Nullam purus ligula, fringilla in augue at, volutpat condimentum felis.

Cras scelerisque lobortis rhoncus. Duis neque diam, convallis ut tellus quis, porta malesuada tortor. In fermentum est id magna dapibus, eget porta sem luctus. Sed maximus metus in augue lacinia sagittis nec sit amet ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec quis augue diam. Sed sodales tellus turpis, id interdum risus sagittis a. Nulla luctus libero eu mauris ultricies maximus. Duis scelerisque blandit diam, a viverra tellus faucibus ut. Suspendisse volutpat et metus a euismod.

Vivamus sed augue blandit augue sagittis molestie. Aliquam rhoncus nisl quam, vel imperdiet ex facilisis nec. Quisque tristique placerat diam in laoreet. Maecenas nec orci quam. Duis neque risus, efficitur finibus blandit a, ultrices ac leo. Sed commodo varius dui id fringilla. Duis interdum neque vehicula odio euismod convallis. Praesent quis porttitor mauris. Fusce at eleifend tellus. Proin vestibulum nisi eros, eget fringilla nulla vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus molestie vestibulum lacus, ut posuere tortor. Vestibulum rutrum, sem ac pharetra condimentum, ipsum lorem dignissim leo, vitae pulvinar lectus libero feugiat risus. Praesent ut neque in enim rutrum tincidunt consequat a ante. Sed ultrices finibus nibh, ac porttitor neque elementum in. Fusce laoreet facilisis dolor, elementum hendrerit sapien egestas et. 
              </p>   
        </div>
        
        <div class="mt-4">
          <form>
            <div>
            <input type="text" requiredclass=" border border-indigo-600 focus:border-lime-400 focus:outline-hidden py-2 px-4 rounded-lg min-w-100 max-w-100 "></input>
          </div>
          <div>
            <input type="submit" value="Place Bid" class = " bg-blue-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full min-w-100 max-w-100 mt-5"></input>
            
          </div>
          </form>
          
          
        </div>
        
      </div>
    </div>


  );
}

function NoDisplay() {
  return(
    <div>
      <h1>Nothing To Show!</h1>
    </div>
  );
}

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const submitAccount = async (e) => {
    e.preventDefault()
    try {
      if(password!==confirm_password) throw new Error("Must be same password");
      const response = await axios.post("http://localhost:3000/api/auth/sign", {
        username,
        password
      });
      console.log("Success: ", response.data);
    } catch(error) {
      console.error("Error submitting data: ", error);
    }
    
  }

  return (
    <div>
      <form onSubmit={submitAccount}>
        <div class=" space-y-5">
          <div class="w-full h-full flex justify-center">
            <AiOutlineUser class="min-h-20 max-h-20 min-w-20 max-w-20 border-4 rounded-full bg-gray-700"/>
          </div>
          <div>
            <label id="username"><h2>Username:</h2></label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="username"></input>
          </div>
          <div>
            <label id="password"><h2>Password:</h2></label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="password"></input>
          </div>
          <div>
            <label id="confirm_password"><h2>Confirm Password:</h2></label>
            <input type="password" value={confirm_password} onChange={(e)=>setConfirmPassword(e.target.value)} required class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="password"></input>
          </div>
          <div>
            <input type="submit" value="Sign Up" class="min-w-100 max-w-100 border rounded-full py-2 px-4 bg-blue-700 hover:bg-white hover:text-black"></input>
          </div>
          {/* <AiOutlineUser /> */}
        </div>
      </form>
    </div>
  )
} 

function AccountDisplay () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = async (e, user) => {
    e.preventDefault();
    console.log("Username: " + username);
    console.log("Password: " + password);
  }

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div class=" space-y-5">
          <div class="w-full h-full flex justify-center">
            <AiOutlineUser class="min-h-20 max-h-20 min-w-20 max-w-20 border-4 rounded-full bg-gray-700"/>
          </div>
          <div>
            <label id="username"><h2>Username:</h2></label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="username"></input>
          </div>
          <div>
            <label id="password"><h2>Password:</h2></label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="password"></input>
          </div>

          <div>
            <input type="submit" value="Log In" class="min-w-100 max-w-100 border rounded-full py-2 px-4 bg-blue-700 hover:bg-white hover:text-black"></input>
          </div>
          {/* <AiOutlineUser /> */}
        </div>
      </form>
      

    </div>
  );
}

const CreateItem = () => {
  return(
    <div>
      <form>
        <div class=" flex justify-center p-5 space-x-15 mt-2">
      <div class="space-y-4">
        <div>
          <label id="name_customer" ><h2>Name Of Seller:</h2></label>
          <input type="text" class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="name_customer" required></input>
        </div>
        <div>
          <label id="phone_number" ><h2>Phone Number:</h2></label>
          <input type="text" class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="phone_number" required></input>
        </div>
        
        <div>
          <label id="bid_deadline" ><h2>Bid Deadline:</h2></label>
          <input type="date" class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="bid_deadline" required></input>
        </div>

        <div >
          <label id="product_description" ><h2>Product Description:</h2></label>
          <textarea rows="5" cols="50" type="submit" placeholder='Product Description' class="border py-2 px-4 font-thin font-sans" label="product_description"></textarea>
          {/* <input class ="min-w-100 max-w-100 border" label="name_customer"></input> */}
        </div>
      </div>

      <div class="space-y-4">
        <div class="min-h-40 max-h-40 min-w-100 max-w-100 border">
        
        </div>

          <div>
            <label id="starting_bid" required><h2>Starting Bid:</h2></label>
            <input type="text" class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="starting_bid"></input>
          </div>
          <div>
            <label id="minimum_bid" required><h2>Minimum Gap Bid:</h2></label>
            <input type="text" class ="min-w-100 max-w-100 border rounded-full py-2 px-4" label="minimum_bid"></input>
          </div>

          <div class="mt-10">
            <input type="submit" value="Create" class="border rounded-full bg-blue-700 hover:bg-white hover:text-black min-w-100 max-w-100 min-h-10 max-h-10"></input>
          </div>

        
      </div>


      
      
    </div>
      </form>
    </div>
    


  );
}

function PopupDisplay(display, commandID, w,h) {

  
  return (


  <el-dialog>
  <dialog id={commandID} aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
    <el-dialog-backdrop class="fixed inset-0 z-40 bg-gray-950/20 transition-opacity backdrop-blur-xs data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

    <div tabIndex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
      <el-dialog-panel class={"relative z-50 flex justify-between bg-slate-900 border-2 border-gray-300 rounded-xl shadow-md p-6 mt-10 mb-10 text-white min-w-" + {w} +"max-w-" + {w} + "min-h-" + {h} + "max-h-" + {h}}>
        <div class="absolute">
          <button command="close" commandfor={commandID}  class="size-10 border rounded-full font-sans border-indigo-400 text-cyan-400 hover:scale-120 hover:bg-white">X</button>
        </div>
        
        <div class="">
        {/* {ItemDisplay(<img src='/src/assets/img1.jpg'></img>)} */}
        {display}
      </div>

      </el-dialog-panel>
    </div>
  </dialog>
</el-dialog>
    
  ); 

}

function PromoDisplay() {
  return (
    <div class= "flex justify-between min-w-250 max-w-250 min-h-110 max-h-110 backdrop-blur-xs bg-slate-900/80 border-2 border-gray-300 rounded-xl shadow-md p-6 mt-10 mb-10 text-white">
        {/* {ItemDisplay()} */}

        {/* {ItemDisplay(<img src='/src/assets/img1.jpg'></img>)} */}
        <div class="top-0 z-30 min-w-235 max-w-235">
                  {ImageDisplay(true, ItemDisplay(<img src='/src/assets/img1.jpg'></img>))}

        </div>
    </div>
  );
}

function MainDisplay() {
  // let display = (ImageDisplay() == null) ? <NoDisplay /> : <ImageDisplay />;
  
  return(
  
  <div class= "flex justify-center w-250 h-fit bg-slate-900/80 border-2 border-gray-300 backdrop-blur-xs rounded-xl shadow-md p-6 mt-10 mb-10 text-white">
    <MiniItemDisplay />

  </div>

  );
    
}

function App() {

  // const [backendData, setBackendData] = useState([{}])

  // useEffect(()=> {
  //   fetch("/api").then(
  //     response=>response.json()
  //   ).then(
  //     data=> {
  //       setBackendData(data)
  //     }
  //   )
  // },[])


  // const fetchApi = async () => {
  //   const response = await axios.get("http://localhost:8080/api")
  //   console.log(response.data.fruits);
  // }
  // useEffect(()=> {
  //   fetchApi()
  // },[])

  return (
    <div class = "font-bold font-display">
      <div class = "bg-gray-950/60 h-25 sticky backdrop-blur-xs border-b-1 rounded-full border-white">
        <header >
          <nav class="sticky top-0 z-10 ">
            <div class = "grid grid-cols-2 min-w-full max-w-full">

              <div class="flex items-center justify-center">
                <div class="text-white hover:text-yellow-400 text-4xl mt-2">
                  <button onClick={notify} class="min-h-10 max-h-10 min-w-10 max-w-10">
                      <AiFillBell />

                  </button>
                </div>
                <div class = "m-5 text-5xl text-blue-400 italic font-semibold">
                  <h1>Auction System</h1>
                </div>
                
              </div>


          
          
          <div class = "flex items-center justify-end mr-20">
            <ul>
              <div class = "flex justify-between space-x-10 text-white">
                <li><button command="show-modal" commandfor="create" class="border min-w-20 max-w-20 min-h-10 max-h-10 rounded-full bg-blue-700 text-white hover:scale-110 hover:bg-white hover:text-black">Create</button>
                </li>
                <li><button class=" min-w-20 max-w-20 min-h-10 max-h-10 hover:scale-110 hover:rounded-full hover:border hover:bg-white hover:text-black">Help</button></li>
                <li><button class=" min-w-20 max-w-20 min-h-10 max-h-10 hover:scale-110 hover:rounded-full hover:border hover:bg-white hover:text-black">About</button></li>
                <li><button command="show-modal" commandfor="account" class=" min-w-20 max-w-20 min-h-10 max-h-10 hover:scale-110 hover:rounded-full hover:border hover:bg-white hover:text-black ">Log In</button></li>
                <li><button command="show-modal" commandfor="create_account" class=" min-w-20 max-w-20 min-h-10 max-h-10 hover:scale-110 hover:rounded-full hover:border hover:bg-white hover:text-black ">Sign Up</button></li>
                
                
                
                
              </div>
              
            </ul>

          </div>
        </div>
          </nav>
        
        
      </header>
      </div>
      <ToastContainer 
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                ></ToastContainer>

      <div class = "flex justify-center">
        <div class="grid-cols-1 grid-rows-2">
          <PromoDisplay />
          <MainDisplay />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* <PopupDisplay /> */}
            {PopupDisplay(CreateItem(), "create",270,140)}
            {PopupDisplay(AccountDisplay(),"account", 270,140)}
            {PopupDisplay(CreateAccount(),"create_account", 270,140)}
            {PopupDisplay(ItemDisplay(<img src='/src/assets/img1.jpg'></img>), "info",250,100)}
          </div>

        </div>
        
        
      </div>
    </div>

  );
}

export default App
