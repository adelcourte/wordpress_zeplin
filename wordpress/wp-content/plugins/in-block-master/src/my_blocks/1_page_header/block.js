import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, PlainText } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/page-header`

registerBlockType(BLOCK_NAME, {
  title: __('Page header'),
  description: __('A simple title-subtitle-image composition for your page introduction.'),
  icon: 'media-document',
  category: 'common',
  attributes: {
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    switchDisplay: {
      type: 'boolean',
      default: false
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, switchDisplay, title, subtitle }, setAttributes, className } = props
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
                labels={{ title: 'The Image' }}
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
            <PlainText 
              keepplaceholderonfocus="true"
              placeholder={ __( 'Subtitle') }
              className={ className }
              value={subtitle}
              onChange={ (param1) => {
                setAttributes( { subtitle: param1 } )
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
          <BaseControl>
            <ToggleControl
              label={__("Alterner l'image et le texte")}
              checked={switchDisplay}
              onChange={(switchDisplay) => { setAttributes({ switchDisplay }) }}
            />
          </BaseControl>
        </InspectorControls>
      </>
    )
  },

  save: ({ attributes: { imageUrl, title, subtitle, switchDisplay } }) => (
    <section className='page_header'>
      <div className='page_header__content'>
          <p className='page_header__content__title'>{title}</p>
          <p className='page_header__content__subtitle'>{subtitle}</p>
      </div>
      <div className='page_header__image'>
          {
            imageUrl &&
            <img src={imageUrl} alt='page_header_image'></img>
          }
      </div>
    </section>
  )
})
