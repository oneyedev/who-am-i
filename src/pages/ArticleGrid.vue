<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          v-model="selectedTags"
          :items="tags"
          label="Filter"
          multiple
          chips
          hint="Select tags"
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex
        v-for="(card, index) in filtered"
        :key="index"
        v-bind="{ ['xs12']: true, ['sm6']: true, ['md4']: true, ['xl3']: true }"
      >
        <v-card>
          <v-img :src="card.src" aspect-ratio="1.5"></v-img>
          <v-divider></v-divider>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ card.title }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div>{{ card.text }}</div>
          </v-card-text>
          <v-card-text>
            <v-chip v-for="tag in card.tags" :key="tag">{{ tag }}</v-chip>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn flat color="orange">Share</v-btn> -->
            <v-btn flat color="orange" @click="goToArticle(card.to)">read</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Build Github Page using Vue cli 3',
          text: 'Vue cli 3를 이용하여 Github page 만들기',
          src: 'https://cli.vuejs.org/favicon.png',
          tags: [
            'vue',
            'vue-cli',
            'vue-cli3',
            'github page',
            'blog-diary',
            'diary'
          ],
          to: 'build-github-page-using-vue-cli-3'
        },
        {
          title: 'Convert Markdown Text into HTML (vue-showdown-highlight) (1)',
          text:
            'vue-showdown-highlight을 이용해 Mark Down Text를 HTML로 변환하기 (1)',
          src: 'https://vue-showdown.js.org/logo.png',
          tags: ['vue', 'showdown', 'highlight', 'md', 'blog-diary', 'diary'],
          to: 'convert-markdown-text-into-html-1'
        }
        // {
        //   title: 'Over Full Stack Game Dev. Diary - 3D Flappy Bird (1)',
        //   text: '오버 풀스택 게임 개발 체험기 - 3D Flappy Bird',
        //   src:
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/1200px-Unity_Technologies_logo.svg.png',
        //   tags: ['Unity', 'Over Full Stack', '3D Flappy Bird', 'Diary'],
        //   to: 'md-text-into-vue-component'
        // }
      ],
      selectedTags: []
    }
  },
  computed: {
    tags() {
      return [...new Set(this.cards.map(card => card.tags).flat())]
    },
    filtered() {
      return this.cards.filter(card => {
        for (const selected of this.selectedTags) {
          if (card.tags.includes(selected)) {
            return true
          }
        }
        return false
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    next(vm => vm.setFilterTags(tags))
  },
  beforeRouteUpdate(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    this.setFilterTags(tags)
    next()
  },
  methods: {
    goToArticle(to) {
      this.$router.push(`/articles/${to}`)
    },
    setFilterTags(tags) {
      if (tags.length > 0) {
        this.selectedTags = tags
      } else {
        this.selectedTags = this.tags
      }
    }
  }
}
</script>

<style scoped></style>
