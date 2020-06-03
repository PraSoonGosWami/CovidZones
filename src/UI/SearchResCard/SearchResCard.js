import React from 'react'
import Card from "@material-ui/core/Card";
import Style from './SearchResCard.module.css'
import SearchIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
const SearchResCard = (props) => {
    return(
        <Card elevation={4} className={Style.SearchResCard}>
            <IconButton onClick={props.onClose}  aria-label="close" className={Style.CloseButton} color={"secondary"}>
                <SearchIcon />
            </IconButton>
            {props.children}
        </Card>
    )
}

export default SearchResCard
