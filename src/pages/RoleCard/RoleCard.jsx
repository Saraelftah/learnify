import { motion } from "framer-motion";

function RoleCard({ src, label, statment, onSelect }) {

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="card bg-base-100 lg:w-96 md:w-70 sm:w-full shadow-sm">
          <figure className="px-10 pt-10 w-70 mx-auto">
            <img src={src} alt="role" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-[var(--dark-color)]">{label}</h2>
            <p className="text-[var(--text-color)] text-xs md:text-sm lg:text-base">{statment}</p>
            <div className="card-actions">
              <button
                className="btn btn-xs sm:btn-sm md:btn-md bg-[var(--secondary-color)] 
              border border-[var(--secondary-color)] text-white
               hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300"
                onClick={() => onSelect(label.toLowerCase())}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default RoleCard;
