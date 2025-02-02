import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaPlaceholder, PlainText } = wp.blockEditor
const { Button } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/solutions`

registerBlockType(BLOCK_NAME, {
  title: __('Solutions'),
  description: __('Present the solutions you offer to your client.'),
  icon: 'nametag',
  category: 'common',
  attributes: {
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    backgroundImageUrl: {
      type: 'string'
    },
    backgroundImageId: {
      type: 'integer'
    },
    title: {
      type: 'string'
    },
    content: {
      type: 'array'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, backgroundImageUrl, backgroundImageId, title, content = [] }, setAttributes, className } = props
    return (
      <>
        <div className={className + '__image'}>
          {imageUrl ? (
            <img src={backgroundImageUrl} alt='' />
          ) : (
            <MediaPlaceholder
              onSelect={(media) => setAttributes({ backgroundImageUrl: media.url, backgroundImageId: media.id })}
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Background shape' }}
            />
          )}
        </div>
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
                labels={{ title: 'Icon' }}
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
                placeholder={__('Description')}
                value={value.description}
                onChange={(description) => {
                  const newContent = [...content]
                  newContent[index].description = description
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
      <section className="solutions">
        <p className="big_title">{title}</p>
        {content.map((value) => {
          const imageUrl = `${value.imageUrl}`
          return(
            <div className="solution">
              <div className="solution__icon">
                <img src={imageUrl} alt="solution_icon"></img>
              </div>
              <p className="solution__title">{value.title}</p>
              <p className="solution__description">{value.description}</p>
            </div>
          )
        })}
        <div className="solutions__shape">
            {
                backgroundImageUrl &&
                <img src={backgroundImageUrl} alt='solutions_shape'></img>
            }
        </div>
      </section>
    )
  }
})
