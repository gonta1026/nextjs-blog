import { GetStaticProps, GetStaticPaths } from 'next'

import Layout, { siteTitle } from '../../components/layout'
import { useRouter } from 'next/router'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { postData } from '../../types/posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}

const Post = ({postData}: {postData: postData}): JSX.Element => {
  const { title, date, contentHtml }  = postData
  const router = useRouter()
  const { pid } = router.query
  return (
    
    <Layout>
      <Head>
        <title>{title} | {siteTitle} {pid}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

export default Post;
