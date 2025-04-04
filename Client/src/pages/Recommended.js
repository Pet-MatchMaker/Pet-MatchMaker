import React, {useState, useEffect} from "react";
import styles from "./Recommended.module.css"
import { Link, useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import { fetchPetProfiles } from "../api/petService";
import { useLocation } from "react-router-dom";



const Recommended = () => {
        const[pets, setPets] = useState([]);
        const[filteredPets, setFilteredPets] = useState([]);
        const[favorites, setFavorites] = useState([]);
        const [loading, setLoading] = useState(true); 

//get user preferene from navigation state
        const location = useLocation();
        const [userPreferences, setUserPreferences] = useState(location.state?.userPreferences || JSON.parse(localStorage.getItem('petQuizAnswers')) || {});
       
        const navigate = useNavigate();
     

        console.log("Current User preferences:", userPreferences);
        

       
        //Handles api
        useEffect(() => {
            const fetchPets = async ()=>{
                try{
                    setLoading(true);
                    console.log("Fetching Pets with preferences:", userPreferences);
                    const petsData = await fetchPetProfiles(userPreferences);
                    console.log(petsData);
                    if(!petsData || petsData.length === 0){
                        console.warn("API returned empty results");
                    }
                    setPets(petsData || []);
                    setFilteredPets(petsData || []);
                 }catch(error){
                    console.error("Error Fetching Pets: ", {
                        message: error.message,
                        response: error.response?.data
                    });
                 }finally{
                    setLoading(false);
                 }
            };

            //only fetch if we have a prefernce
            if(Object.keys(userPreferences).length>0){
                fetchPets();
            }
            else{
                console.warn("No user preferences avaiable");
                setLoading(false);
            }       
            }, [userPreferences]);

          

            const handleMoreInfo = (pet) =>{
                navigate("/PetBio", {state: {pet} });
            };

        


    

                 return(
                    
                    <div className={styles.Recommended}>
                        <div className={styles.containers}>
                            
                        <div className={styles.quiz}>
                             <img src="/quiz.png" alt="quiz" className="quiz"/>
                             </div>
                        
                             <div className={styles.heart}>
                             <img src="/heart.png" alt="heart" className="heart"/>
                             </div>
                        
                          
                             <div className={styles.profile}>
                             <img src="/profile.png" alt="profile" className="profile"/>
                             </div>
                        
                             <div className={styles.house}>
                             <img src="/house.png" alt="house" className="house"/>
                             </div>
                            
                             <div className={styles.blue}>
                             <img src="/blue1.png" alt="blue1" className="blue2"/>
                             </div>
                        
                             <div className={styles.blue2}>
                             <img src="/bluepaw.png" alt="blue2" className="blue2"/>
                             </div>
                    </div>
                    
                        <div className={styles.container}>
                        <h1> Recommended Pets</h1>
                        </div>
                        <div className={styles.RecommendedContainer}>
                        {/* Navigation Bar */}
                        <nav className={styles.navBar}>
                            <ul className={styles.navList}>
                                <li>
                                    <Link to="/Recommended" className={`${styles.navLink} ${styles.navLink1}`}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/Userprofile" className={`${styles.navLink} ${styles.navLink2}`}>Profile</Link>
                                </li>
                                <li>
                                    <Link to="/favorite" className={`${styles.navLink} ${styles.navLink3}`}>Favorite</Link>
                                </li>
                                <li>
                                <Link to="/takeQuizAgain" className={`${styles.navLink} ${styles.navLink4}`}>Questionnaire Quiz</Link>
                        </li>
                            </ul>
                        </nav>
                          </div>
                 <div className={styles.listing}>
                      <p>Your Recommended Pets: </p>
                      </div>

                      {/*Loading*/}
                     {loading ? (
                        <div className={styles.loading}>
                            <p>Loading Recommended pets...</p>
                            </div>
                     ):(
                        <> 

                     {/*shows pets*/}

                     {filteredPets.length > 0 ?(
                        <div>
                             {/*top 3 pets*/}
                             <div className={styles.petcontainers}>
                                {filteredPets.slice(0, 3).map((pet, index) => (
                                    <PetCard
                                     key = {pet.petfinder_id}
                                     pet ={pet} 
                                     rank={index + 1}
                                     onMoreInfo={handleMoreInfo}
                                     />
                                ))}
                            </div>

                            {filteredPets.length > 3 && (
                                <div>
                             <div className={styles.petcontainer}>
                                {filteredPets.slice(3).map((pet) => (
                                    <PetCard 
                                        key = {pet.petfinder_id} 
                                        pet={pet}
                                        isFavorite={favorites.some((fav) => fav.petfinder_id === pet.petfinder_id )}
                                        onMoreInfo={handleMoreInfo}
                                        />
                                ))}
                         </div>
                    </div>
                 )}
            </div>
            

                ) : (
                    <p className="text-center text-gray-600">No Matching Pets Found! Try the quiz again</p>
                )} 
                 </>
            )}
            
                </div>
           
        );
    };

    export default Recommended;