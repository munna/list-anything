
import gql from "graphql-tag";

export const GET_BUSINESS = gql`
query BusinessDetails {
  business {
    email
    title
    description
    contact_owner
    category
    business_images {
         image_url
    }
  }
}
`;

export const SAVE_BUSINESS = gql`
mutation SaveBusiness($address: String,
  $description: String,
  $category: String,
  $title: String,
  $contact_owner: String,
  $created_at: timestamptz,
  $email: String,
  $lat: String,
  $lng: String,
  $mobile_no: String) {
  insert_business(objects: {address: $address, category: $category, contact_owner: $contact_owner, created_at: $created_at, description: $description, email: $email, lat: $lat, lng: $lng, mobile_no: $mobile_no, title: $title}) {
    affected_rows
    returning {
        id
      }
  }
}
`;

export const SAVE_BUSINESS_IMAGES = gql`
mutation MyMutation($objects: [business_images_insert_input!]!) {
  insert_business_images(objects: $objects) {
    affected_rows
  }
}`;