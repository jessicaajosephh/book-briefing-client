class Review {

    constructor(id, title, author, content, likes, comments){
        this.id = id
        this.title = title
        this.author = author
        this.content = content 
        this.likes = likes 
        this.comments = [...comments] 
    }

    static fetchReviews(){
        fetch("http://localhost:3000/reviews")
        .then(resp => resp.json())
        .then(json => {
            debugger
            Review.renderReviews(json)
        })
    }

    static renderReviews(reviewsInfo){
        reviewsInfo.forEach(review => {
            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")
            let likeButton = document.createElement("button")
            let ul = document.createElement("ul")

            let reviewComments = review.comments.map(comment => {
                let li = document.createElement("li")
                let div = document.createElement("div")
                let commentContent = document.createElement("p")
                let commentLikes = document.createElement("p")
                let likeButton = document.createElement("button")
                commentContent.innerText = comment.content 
                commentLikes.innerText = comment.likes 
                likeButton.innerText = "♥"
                div.appendChild(commentContent)
                div.appendChild(commentLikes)
                div.appendChild(likeButton)
                li.appendChild(div)
                return li 
            })

            div.id = review.id 
            h3.innerText = review.title
            h4.innerText = review.author 
            p.innerText = review.content
            likeButton.innerText = "♥"
            likeButton.addEventListener("click", likeReview.bind(review))

            div.parentElement(h3)
            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(likeButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)

            reviewsContainer().appendChild(div)
        })
    }

}