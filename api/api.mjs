import * as https from 'https';
import { programacao } from './programacao.mjs';

const getRequest = () => {
  const options = {
      host: 'ondemand-api.jmvtechnology.com',
      path: '/galleries/gktxJy5WSUjliGbKJz0xsb9HybNHVm',
      headers: {
        'authorization': '24c5d811863edaa273e72afeef1e18f7',
        'jmvkey': '11umov0',
      },
  };

  return new Promise((resolve, reject) => {
    const req = https.get(options, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

const isInvalidThumbnail = (thumbnail) => {
  return thumbnail.includes('jmvtechnology.comnull') || thumbnail.includes('jmvtechnology.comcover');
}

const prepareVideos = (items) => {
  const videos = [];
  if (!items?.length) return videos;

  for (const video of items) {
    let thumbnail = video?.thumbnail || '';

    if (thumbnail == '' || isInvalidThumbnail(thumbnail)) {
      thumbnail = video?.covers.length > 0 ? video.covers[0] : null;
    }
    
    videos.push({
      hash: video?.hash,
      name: video?.name,
      playerSource: video?.playerSource,
      thumbnail,
      covers: video?.covers,
    });
  }

  return videos;
}

const prepareData = (data) => {
  const results = [];

  for (const item of data) {
    const videos = prepareVideos(item?.videos);
    if (videos.length > 0) {
      results.push({
        id: item?.id,
        name: item?.name,
        total_videos: item?.total_videos,
        videos: videos,
      });
    }
  }

  return results;
}

const getProgramacao = () => {
  const now = new Date();
  const date = new Date(now.getTime() + (-3 * 60 * 60 * 1000));
  const programaDefault = {
    id: 1,
    name: 'Assista ao vivo',
    startTime: date,
    endTime: date,
    thumbnail: 'https://s3.sa-east-1.amazonaws.com/tvaraguari.tv.br/public/capas/tv-araguari.png',
  };
  const weekday = date.getDay();
  const result = programacao.find((value) => value.weekday == weekday);

  if (result && result?.items?.length > 0) {
    const programa = result.items.find((item) => {
      const hora1 = item.startTime.split(":");
      const hora2 = item.endTime.split(":");
      const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hora1[0], hora1[1]);
      const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hora2[0], hora2[1]);
      return startTime <= date && endTime >= date;
    });
    if (programa) return programa;
  }

  return programaDefault;
}

export const handler = async(event) => {
  try {
    let result = await getRequest();
    result = prepareData(result.data);

    return {
      programacao: getProgramacao(),
      gravados: result,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
