<script>
export default {
    name: 'BlogPostPreview',
    props: {
        publishDate: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false,
        }
    },
    computed: {
        formatPublishDate() {
            const dateFormat = new Date(this._props.publishDate)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            } 
            
            return dateFormat.toLocaleDateString('en-US', options)
        }
    }
}
</script>

<template>
	<section class="blog-post">
        <a :href="path">
            <img  v-if="image" class="blog-image" :src="'/images/' + image" v-bind:alt="image" >
        </a>
        <h2 class="blog-post__title">
            <a :href="path" class="blog-post__link">{{ title }}</a>
        </h2>
        <time class="blog-post__time">{{ formatPublishDate }}</time>
        <p v-if="excerpt" class="blog-post__excerpt">{{ excerpt }}</p>
        <hr>
    </section>
</template>

<style lang="stylus" scoped>
primary-color = #22AAFF


.blog-image {
    max-height: 18rem;
}

.blog-post {
    margin-bottom: 2.5rem;
}

.blog-post__button {
	display: inline-block;
}

.blog-post__excerpt {
  margin-top: 0.5rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  width: 460px;
  font-size:0.98rem;
}

.blog-post__link {
    font-weight: 700;
    color: #2c3e50;

    &:hover {
        text-decoration: underline;
    }
}

.blog-post__time {
    font-family: 'Poppins';
    font-size: 0.75rem;
    font-weight: 500;
}

.blog-post__title {
	margin-top: 0.5rem;
    margin-bottom: 0rem;
}

.button {
    font-family: 'Poppins';
    font-weight: 500;
	border: 1px solid primary-color;
	border-radius: 4px;
	color: primary-color;
	font-size: 0.9rem;
	padding: 0.3rem 0.6rem;
	text-transform: uppercase;
	box-shadow: 0 0;
	transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.button:hover {
    background-color: primary-color;
    color: #fff;
    text-decoration: none;
}

.tag-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    margin-bottom: 25px;
}

.tag-list__item {
    margin-left: 10px;
}

.tag-list__item:first-child {
    margin-left: 0;
}

.tag-list__btn {
    padding: 5px;
    font-size: 0.9rem;
    background-color: #fff;
}
</style>
