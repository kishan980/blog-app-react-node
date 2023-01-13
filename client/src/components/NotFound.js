import { Helmet } from "react-helmet"

const NotFound = () =>{
    return(
        <>
        (<Helmet>
            <title data-rh="true">404 - Not found</title>
            <meta name="description" content="Oops! That is page could not found"/>
        </Helmet>)
        <div className="notFound">
        <div className="notFound__container">
        <h1 className="notFound__container__h1">404</h1>
        <p className="notFound__container__p">
        Oops! That is page could not found
        </p>
        </div>
        </div>
        </>
    )
}

export default NotFound