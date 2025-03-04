import mitt from 'mitt';

type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc
}

export const eventBus = mitt<Events>();