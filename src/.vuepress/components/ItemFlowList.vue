<script>
export default {
    name: 'ItemFlowList',
    props: {
        tags: {
            type: Array,
            required: false
        },
         date: {
            type: String,
            required: false
        },
        excerpt: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false,
        },
        link: {
            type: String,
            required: false
        },
        video: {
            type: String,
            required: false
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            displayRange: {
                end: 12
            },
            selectedTag: ''
        }
    },

    computed: {
        
        filteredList() {
            const props = this.$options.propsData

            if (props) {
                if (props.list && props.list.length > 0) {
                    return props.list.filter(item => {
                        const isItemFlowPost = item.path.indexOf("/item-flow/") > -1
                        const isReadyToPublish = new Date(item.frontmatter.date) <= new Date()
                        const hasTags = item.frontmatter.tags && item.frontmatter.tags.includes(this.selectedTag)

                        const shouldPublish = this.selectedTag ? isItemFlowPost && isReadyToPublish && hasTags : isItemFlowPost && isReadyToPublish
                        const dave = new Date(item.frontmatter.date)
                        const options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        } 
                        const date = dave.toLocaleDateString('en-US', options)

                        if (shouldPublish) {
                            return item
                        }
                    }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
                }
            }
        },
    },
    methods: {
        formatPublishDate(d) {
            const dateFormat = new Date(d)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            } 
            
            return dateFormat.toLocaleDateString('en-US', options)
        },
        loadMore() {
            this.displayRange.end += 12
        },
        updateSelectedTag(tag) {
            this.selectedTag = tag
        }
    }
}
</script>

<template>
	<div class="blog-list__container"> 

        <ul class="blog-list">
            <li v-for="(item, index) in filteredList"
                class="blog-list__item">

                <section class="blog-post">
                    
                    <img  v-if="item.frontmatter.image" class="blog-image" :src="'/images/' + item.frontmatter.image" v-bind:alt="item.frontmatter.image" >

                    <iframe v-if="item.frontmatter.video" width="560" height="315" :src="item.frontmatter.video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    <h2 class="blog-post__title">
                        {{ item.frontmatter.title }}
                    </h2>
                    <a :href="item.path" class="link">
                    <time class="blog-post__time">{{ formatPublishDate(item.frontmatter.date) }}</time>
                    </a>
                    <p v-if="item.frontmatter.excerpt" class="blog-post__excerpt">{{ item.frontmatter.excerpt }}</p>
                    <p>
                    <a v-if="item.frontmatter.link" :href="item.frontmatter.link" target="_blank">{{ item.frontmatter.link}}</a>
                    </p>
                    

                    
                    
                    <hr>
            </section>

              
            </li>
        </ul>

        <div v-if="displayRange.end <= filteredList.length" class="pagination">
            <button
                @click="loadMore"
                class="button--load-more"
                type="button"
            >
                Load More
            </button>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
primary-color = #22AAFF

.link {
    decoration: none;
    color: #2c3e50;
}

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
  font-weight:600;
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

.blog-list {
	padding: 0;
	margin: 0;
}

.blog-list__container {
    margin-top: 2rem;
}

.blog-list__header {
    display: flex;
    align-items: center;
}

.blog-list__item {
	list-style-type: none;
}

.button--load-more {
	background-color: primary-color;
	border-radius: 4px;
	color: #fff;
	font-size: 1rem;
	padding: 0.5rem 0.75rem;
	text-transform: uppercase;
	font-weight: 500;
	box-shadow: 0 0;
    cursor: pointer;
	transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.button--load-more:hover {
    background-color: #fff;
    border: 1px solid primary-color;
    border-radius: 4px;
    color: primary-color;
}

.clear-filter-btn {
    align-self: center;
    margin-left: 20px;
}

.filtered-heading {
    display: flex;
}

.pagination {
    text-align: center;
}

.tooltip-ex { /* Container for our tooltip */
 position: relative;
 display: inline-block;
 cursor: help;
 margin-right: 20px;
 display: inline-block;
 float: left;
}

.tooltip-ex-bottom {
 top: 135%;
 left: 50%;
 margin-left: -60px;
}

.tooltip-ex-text {
 visibility: hidden;
 position: absolute;
 width: 300px;
 background-color: #555;
 color: #fff;
 text-align: center;
 padding: 20px;
 border-radius: 6px;
 z-index: 1;
 opacity: 0;
 transition: opacity .6s;
}

.tooltip-ex:hover .tooltip-ex-text { /* Makes tooltip visible when hovered on */
 visibility: visible;
 opacity: 1;
}
</style>
