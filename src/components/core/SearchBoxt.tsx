import { Input } from '../ui/input'

const SearchBoxt = ({searchValue,setSearchValue}:{searchValue:string,setSearchValue:(value:string)=>void}) => {
  return (
    <Input value={searchValue} type='text' onChange={(e)=>setSearchValue(e.target.value)} placeholder='Type Here To Search Tasks'/>
  )
}

export default SearchBoxt