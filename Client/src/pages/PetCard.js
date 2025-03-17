import {FaHeart} from "react-icons/fa"
import styles from './PetCard.module.css';

const PetCard = ({pet, rank, onMoreInfo, onAdopt, isFavorite, onToggleFavorite,onRemove}) => {
    const handleToggleFavorite = () =>{
        if(isFavorite){
            onRemove(pet.id);
             }
             else{
                onToggleFavorite(pet);
             }
    };
  

    return(

            <div className = {`{styles.pet-card} ${rank ? styles.ranked : ''}`}>
                {/*Favorite Button*/}

                <button
                    onClick={ handleToggleFavorite}
                    className={styles.favoriteBtn}
                    >
                        <FaHeart className={isFavorite ? styles.favoriteActive : styles.favoriteInactive}/>
                    </button>

                {/* Rank badge  top 3*/} 
                {rank && (
                    <div className= {styles.rankBadge}>
                        #{rank}
                    </div>
                )}

                {/*Pet Image */} 
                <img 
                    src = {pet.photo_medium || "https://via.placeholder.com/150"}
                    alt={pet.name}
                    className={styles.petImage}
                    />

                {/* Pet info */} 
                <h3 className={styles.petName}>{pet.name}</h3>
                <p className={styles.petBreed}>
                    Breed: {pet.breed_primary} {pet.breed_secondary ? `& ${pet.breed_secondary}` : ""}</p>
                
                  {/* Buttons */} 
                <div className={styles.buttonGroup}>
                    <button onClick={() => onMoreInfo(pet)} className={styles.infoBtn}>More Info</button>
                    <button onClick={() => onAdopt(pet)} className={styles.adoptBtn}>Adopt</button>
                </div>
            </div>
        );
    };

    export default PetCard;