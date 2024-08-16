<script setup>

</script>

<template>
  <div class="home_content">
    <h2 style="text-align: center;">前端项目部署到Github，通过Github Actions部署到gh-pages并通过Github Pages访问</h2>
    <br />
    <h3 id='1-github'>1. Github：</h3>
    <ol>
      <li>创建一个空仓库：LearnVue3Demo</li>
      <li>
        生成Token：<code>头像 =&gt; Settings =&gt; Developer settings =&gt; Token(classic) =&gt; Generate new Token</code>，选期限（推荐No
        expiration）、作用范围（推荐 repo），生成后将其复制下来。</li>
      <li>
        设置Secrets：<code>仓库 =&gt; Settings =&gt; Secrets and variables =&gt; Actions =&gt; New repository secret</code>，Name随便填，Secret填刚刚复制的token。
      </li>

    </ol>
    <p>&nbsp;</p>
    <h3 id='2-本地项目'>2. 本地项目：</h3>
    <ol>
      <li>
        <p>修改vite配置里的base为仓库名（base: &#39;/LearnVue3Demo/&#39;）</p>
      </li>
      <li>
        <p>创建工作流：在根目录下创建 <code>.github/workflows/deploy.yml</code></p>
        <pre>
        <code class='language-yaml' lang='yaml'>
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          run_install: true
          version: 8


      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: pnpm

      - name: 安装依赖
        run: pnpm install

      - name: 打包项目
        run: pnpm run build

      - name: 部署到gh-pages分支
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
        </code>
      </pre>
      </li>
      <li>
        <p>执行命令将项目上传到Github</p>
        <pre>
        <code class='language-shell' lang='shell'>
git init
git remote add origin https://github.com/your-username/your-repo-name.git
git add .
git commit -m &quot;Initial commit&quot;
git push origin master
        </code>
      </pre>
      </li>
    </ol>
    <p>&nbsp;</p>
    <h3 id='3-github'>3. Github：</h3>
    <ol>
      <li>来到仓库的 <code>Actions</code> 页，等部署到gh-pages的 CI 完成后，来到仓库 <code>Settings =&gt; Pages</code>设置Github
        pages：Source选择Deploy from a branch，Branch选择gh-pages，点击Save</li>
      <li>再次来到仓库的 <code>Actions</code> 页，新的Actions执行完成后，就可以访问了</li>

    </ol>

    <div class="img_wrapper">
      <img src="@/assets/img/vue.svg" alt="">
    </div>
  </div>
</template>


<style scoped lang="scss">
.home_content {
  li {
    code {
      background-color: #f1f1f1;
      color: #476582;
      padding: 0.15em 0.5em;
      border-radius: 4px;
      transition: color 0.5s, background-color 0.5s;
    }
  }

  pre {
    code {
      display: block;
      width: fit-content;
      min-width: 100%;
      line-height: 1.5;
      font-size: 1rem;
      color : #0e0e0e;
      padding: 0px 24px;
      transition: color 0.5s;
      text-align: left;
      word-spacing: normal;
      word-break: normal;
      overflow-wrap: normal;
      tab-size: 4;
      hyphens: none;
      white-space: pre;
    }
  }



  .img_wrapper {
    margin: 10rem;
    text-align: center;

    img {
      width: 20rem;
    }
  }
}
</style>