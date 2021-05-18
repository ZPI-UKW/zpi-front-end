import { FormikErrors } from 'formik';
import { AreaHTMLAttributes } from 'react';
import { Area } from 'react-easy-crop/types';
import { annoucements } from '../../../data/annoucements';
import { RouteTypeFunc, Initial } from './types';

export const initial: Initial = {
  title: '',
  location: '',
  phone: '',
  email: '',
  description: '',
  costs: {
    day: 0,
    week: 0,
    month: 0,
  },
  images: [],
};

export const routeType: RouteTypeFunc = (
  pathname,
  initialValues,
  params,
  userInfo,
  setInitialValues,
  history
) => {
  const user = {
    email: userInfo.email,
    name: userInfo.name,
    phone: userInfo.phonenumber,
  };

  if (pathname === '/create-advertisement') {
    setInitialValues({
      ...initialValues,
      ...user,
    });
  } else {
    const { addId } = params;
    const annoucement = annoucements.find((el) => el._id === addId);

    if (annoucement === undefined) {
      history.push('/');
      return;
    }

    const { title, description, costs, location, email, phone, images } = annoucement;

    setInitialValues({
      ...user,
      title,
      description,
      costs,
      location,
      email,
      phone,
      images,
    });
  }
};

const readFile = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.size >= 1048576) reject('Maksymalny rozmiar pliku to 1MB!');

    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject('Wystąpił nieznany błąd!');
      },
      false
    );
    reader.addEventListener('error', () => reject('Wystąpił nieznany błąd!'), false);
    reader.readAsDataURL(file);
  });

export const onFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setErrors: (errors: FormikErrors<Initial>) => void,
  images: string[],
  openModal: () => void,
  setCurrentImage: (file: string) => void
) => {
  setErrors({ images: '' });
  if (e.target.files && e.target.files.length > 0 && images.length < 3) {
    const file = e.target.files[0];
    try {
      const imageUrl = await readFile(file);
      setCurrentImage(imageUrl);
      openModal();
    } catch (error) {
      setErrors({ images: error });
    }
  }
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const destCanvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const destCtx = destCanvas.getContext('2d')!;

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0, image.width, image.height);

  destCanvas.width = pixelCrop.width;
  destCanvas.height = pixelCrop.height;

  let imageData = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
  destCtx.putImageData(imageData, 0, 0);

  return destCanvas.toDataURL('image/jpeg');
};
