import { twMerge } from "tailwind-merge"
import clsx from "clsx"
const merge = (...inputs) =>{
    return twMerge(clsx(...inputs));
}

export default merge