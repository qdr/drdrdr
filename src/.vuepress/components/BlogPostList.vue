<script>
export default {
    name: 'BlogPostList',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            displayRange: {
                end: 6
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
                        const isBlogPost = item.path.indexOf("/blog/") > -1
                        const isReadyToPublish = new Date(item.frontmatter.date) <= new Date()
                        const hasTags = item.frontmatter.tags && item.frontmatter.tags.includes(this.selectedTag)

                        const shouldPublish = this.selectedTag ? isBlogPost && isReadyToPublish && hasTags : isBlogPost && isReadyToPublish
                        
                        const image = item.frontmatter.image
                        
                        if (shouldPublish) {
                            return item
                        }
                    }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
                }
            }
        },
    },
    methods: {
        loadMore() {
            this.displayRange.end += 6
        },
        updateSelectedTag(tag) {
            this.selectedTag = tag
        }
    }
}
</script>

<template>
	<div class="blog-list__container"> 
        <div class="blog-list__header">
           
        </div>

        <div 
            v-if="selectedTag"
            class="filtered-heading"
        >
            <h2>
                Filtered by {{ selectedTag }} tag
            </h2>
            <button
                type="button"
                @click="selectedTag = ''"
                class="btn clear-filter-btn"
            >
                Clear filter
            </button>
        </div>
        <ul class="blog-list">
            <li v-for="(item, index) in filteredList"
                class="blog-list__item">
                <BlogPostPreview 
                    v-show="index <= displayRange.end"
                    :excerpt="item.frontmatter.excerpt" 
                    :path="item.path"
                    :publishDate="item.frontmatter.date"
                    :tags="item.frontmatter.tags"
                    :title="item.frontmatter.title"
                    :image="item.frontmatter.image"
                    @updateSelectedTag="updateSelectedTag"
                />
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
