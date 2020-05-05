import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, PlainText } = wp.blockEditor
const { Button, BaseControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/concept`

registerBlockType(BLOCK_NAME, {
  title: __('Concept'),
  description: __('An inventive way to present your main idea/concept.'),
  icon: 'visibility',
  category: 'common',
  attributes: {
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    title: {
        type: 'string'
    },
    question: {
      type: 'string'
    },
    answer: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, name, title, question, answer }, setAttributes, className } = props
    const classNameContainer = className + '__container'

    return (
      <>
        <div className={classNameContainer}>
          <div className={className + '__image'}>
            {imageUrl ? (
              <img src={imageUrl} alt='' />
            ) : (
              <MediaPlaceholder
                onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                allowedTypes={['image']}
                multiple={false}
                labels={{ title: 'Background shape' }}
              />
            )}
          </div>
          <div className={className + '__text'}>
            <PlainText 
              keepplaceholderonfocus="true"
              placeholder={ __( 'Name') }
              className={ className }
              value={name}
              onChange={ (name) => {
                setAttributes( { name: name } )
              } }
            />
            <PlainText 
              keepplaceholderonfocus="true"
              placeholder={ __( 'Title') }
              className={ className }
              value={title}
              onChange={ (title) => {
                setAttributes( { title: title } )
              } }
            />
            <PlainText 
              keepplaceholderonfocus="true"
              placeholder={ __( 'Question') }
              className={ className }
              value={question}
              onChange={ (question) => {
                setAttributes( { question: question } )
              } }
            />
            <PlainText 
              keepplaceholderonfocus="true"
              placeholder={ __( 'Answer') }
              className={ answer }
              value={answer}
              onChange={ (answer) => {
                setAttributes( { answer: answer } )
              } }
            />
          </div>
        </div>
        <InspectorControls>
          <BaseControl>
            <MediaUpload
              onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
              type='image'
              value={imageId}
              className='file'
              render={({ open }) => (
                <Button
                  className={!imageUrl && 'button button-large'}
                  onClick={open}
                >
                  {
                    imageUrl ? (
                      <div className='inspector-controls-flex'>
                        <img className='inspector-controls-flex-img' src={imageUrl} alt='' />
                        <p>{__('Replace image')}</p>
                      </div>
                    ) : (
                      __('Select image')
                    )
                  }
                </Button>
              )}
            />
          </BaseControl>
        </InspectorControls>
      </>
    )
  },

  save: ({ attributes: { imageUrl, name, title, question, answer } }) => (
    <section className="concept">
        <div className="concept__name">  
            <span>{name}</span>
        </div>
        <div className="concept__content">
          <p className="concept__content__title">{title}</p>
          <p className="concept__content__question">{question}</p>
          <p className="concept__content__solution">{answer}</p>
        </div>
        <div className="concept__shape">
            {
                imageUrl &&
                <img src={imageUrl} alt='concept_shape'></img>
            }
        </div>
    </section>
  )
})