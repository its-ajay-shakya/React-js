import {React, useState,useEffect} from 'react'
import Navbar from '../component/Navbar';
import Banner from '../component/Banner';
import {} from '../Css/Home.css'
import Card from '../component/Card';
import Jobs from './Jobs';



const Home =()=>{

    //for the search in banner bitch
    const [query ,setquery]=useState("");
    const handleSearch=(event)=>{
        setquery(event.target.value);
    }


    // for the home page bro

    const[selectedCategory,setselectedCategory] =useState();
    const [jobs,setjobs]=useState([]);

    const fetchjobdata=async()=>{
        try{

            const alljobs= await fetch("http://localhost:5000/alljobs",{
                method:"POST",
                headers:{
                    'Content-Type':'apllication/json'
                },
                body:JSON.stringify({email:localStorage.getItem("userEmail")})                
            })
            const response2=await alljobs.json()
            console.log("alljobs data", response2.data)
            setjobs(response2.data)

            

            const response=await fetch("jobs.json")
            const jobdata=  await response.json();
            // setjobs(jobdata);
            console.log("jobdata",jobdata)
            // console.log(jobdata)
        }
        catch(error){
            console.log(error)

        }
        finally{
        }

    }
    useEffect(() => {
        fetchjobdata();
    
    }, [])


    const filterdItem=jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!==-1)


    

    
    
    //  main funcction
    const filterdData=(jobs,selected,query)=>{
        let filteredJobs =jobs;
        if(query){
            filteredJobs= filterdItem;
        }
        // catagoring filtraion
        
        return filteredJobs.map((data,i)=><Card key={i} data={data}/>)  
    }

    const result=filterdData(jobs,selectedCategory,query);

 
 
    return <>
    <div className='homeMain'>
        

        
        <div>
            <Navbar/>
            <Banner query={query} handleSearch={handleSearch}/>
        </div>
        
        <div className='mainContainerHome'>

            <div className="leftHome">
            </div>

            <div className="midContainer">
            <Jobs result={result}/>
            </div>

            <div className="rightHome">
            </div>

         
           
        </div>
    
    </div>

    {/* <div className='mainContainerHome'>

            <div className="leftHome">
             
            </div>
            <div className="midContainer">
            <Jobs result={result}/>
            </div>
            <div className="rightHome">
            
            </div>

         
           
        </div> */}
   
    </>
}
export default Home;