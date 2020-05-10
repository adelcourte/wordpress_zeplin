import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, PlainText } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/discover`

registerBlockType(BLOCK_NAME, {
  title: __('Discover'),
  description: __('A quick description of a service with a link to find out more about it.'),
  icon: 'visibility',
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
    switchDisplay: {
      type: 'boolean',
      default: false
    },
    name: {
      type: 'string'
    },
    color: {
        type: 'hex'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, backgroundImageUrl, backgroundImageId, switchDisplay, name, title, description }, setAttributes, className } = props
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
                labels={{ title: 'Illustration' }}
              />
            )}
          </div>
          <div className={className + '__image'}>
            {backgroundImageUrl ? (
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
              placeholder={ __( 'Description') }
              className={ className }
              value={description}
              onChange={ (description) => {
                setAttributes( { description: description } )
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
            <MediaUpload
              onSelect={(media) => setAttributes({ backgroundImageUrl: media.url, backgroundImageId: media.id })}
              type='image'
              value={backgroundImageId}
              className='file'
              render={({ open }) => (
                <Button
                  className={!backgroundImageUrl && 'button button-large'}
                  onClick={open}
                >
                  {
                    imageUrl ? (
                      <div className='inspector-controls-flex'>
                        <img className='inspector-controls-flex-img' src={backgroundImageUrl} alt='' />
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

  save: ({ attributes: { imageUrl, backgroundImageUrl, name, title, description, switchDisplay } }) => {

    const discoverClass = `discover ${switchDisplay && 'discover_reverse'}`;
    const shapeClass = `discover__shape ${switchDisplay && 'discover__shape_reverse'}`;

    return(
      <section className={discoverClass}>
          <div className="discover__content">  
              <p className="discover__content__name">{name}</p>
              <p className="big_title">{title}</p>
              <p className="discover__content__description">{description}</p>
              <button className="blue_button">Découvrir {name}</button>
          </div>
          <div className="discover__illustration">
              {
                  imageUrl &&
                  <img src={imageUrl} alt='discover_illustration'></img>
              }
          </div>
          <div className={shapeClass}>
              {
                  backgroundImageUrl &&
                  <img src={backgroundImageUrl} alt='discover_shape'></img>
              }
          </div>
      </section>
    )
  }
})