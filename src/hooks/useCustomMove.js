import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => { /* 생략 */ }

const useCustomMove = () => {
    const navigate = useNavigate()
    
    const [refresh, setRefresh] = useState(false) //칠기
    
    const [queryParams] = useSearchParams()
    
    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)
    
    const queryDefault = createSearchParams({page, size}).toString()
    
    const moveToList = (pageParam) => {
        let queryStr = ""
        
        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)
            
            queryStr = createSearchParams({page:pageNum, size: sizeNum}).toString()
        } else {
            queryStr = queryDefault
        }
        
        setRefresh(!refresh) //추가
    }
    
    const moveToModify = (num) => {
        console.log(queryDefault)
        
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault  //수정하에 기존의 쿼리 스트링 유지를 위해
        })
    }
    return {moveToList, moveToModify, page, size, refresh}
}
export default useCustomMove