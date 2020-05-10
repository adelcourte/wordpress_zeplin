import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaPlaceholder, PlainText } = wp.blockEditor
const { Button } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/blog`

registerBlockType(BLOCK_NAME, {
  title: __('Blog'),
  description: __('If your company runs a blog, you may use this block to present latest posts.'),
  icon: 'nametag',
  category: 'common',
  attributes: {
    title: {
      type: 'string'
    },
    content: {
      type: 'array'
    }
  },

  edit: props => {
    const { attributes: { title, content = [] }, setAttributes, className } = props
    return (
      <>
        <div className={className + '__text'}>
          <PlainText 
            keepplaceholderonfocus="true"
            placeholder={ __( 'Title') }
            className={ className }
            value={title}
            onChange={ (title) => {
              setAttributes( { title: title } )
            } }
          />
        </div>
        {content.map((value, index) => {
          return (
            <>
              <MediaPlaceholder
                //onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                allowedTypes={['image']}
                multiple={false}
                labels={{ title: 'Image' }}
                onSelect={(media) => {
                  const newContent = [...content]
                  newContent[index].imageUrl = media.url
                  setAttributes({ content: newContent })
                }}
              />
              <PlainText
                keepplaceholderonfocus
                placeholder={__('Title')}
                value={value.title}
                onChange={(title) => {
                  const newContent = [...content]
                  newContent[index].title = title
                  setAttributes({ content: newContent })
                }}
              />
              <PlainText
                keepplaceholderonfocus
                placeholder={__('Date')}
                value={value.date}
                onChange={(date) => {
                  const newContent = [...content]
                  newContent[index].date = date
                  setAttributes({ content: newContent })
                }}
              />
              <Button
                onClick={() => {
                  const newContent = [
                    ...content.slice(0, index),
                    ...content.slice(index + 1)
                  ]
                  setAttributes({ content: newContent })
                }}
              >{__('Supprimer')}
              </Button>
            </>
          )
        })}
        <Button
          onClick={() => {
            const newContent = [...content, {}]
            setAttributes({ content: newContent })
          }}
        >{__('Ajouter')}
        </Button>
      </>
    )
  },

  save: ({ attributes: { backgroundImageUrl, title, content } }) => {
    return(
      <section className="blog">
        <p className="big_title">{title}</p>
        <div className="blog__posts">
          {content.map((value) => {
            const imageUrl = `${value.imageUrl}`
            return(
              <div className="blog__posts__post">
                <div className="blog__posts__post__image">
                  <img src={imageUrl} alt="post_image"></img>
                </div>
                <p className="blog__posts__post__title">{value.title}</p>
                <p className="blog__posts__post__date">{value.date}</p>
              </div>
            )
          })}
        </div>
        <button className="blue_button">Plus d'articles</button>
      </section>
    )
  }
})
