// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';
import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
} from '../../lib/sanity.api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  };
  const client = sanityClient(config);

  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
    return res.status(200).json({ message: 'Comment Submitted' });
  } catch (error) {
    return res.status(500).json({ message: 'Coudnt Submit comment', error });
  }
}
