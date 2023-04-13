<!--
  Name: Shin Komori
  Date: November 18, 2022

  This is the APIDOC.md for my webservice implemented as CP4. This is a service
  that provides some examples of hamster names for users when they are looking
  for hamster name examples.
  Users also can add their own ideas of hamster names to the server side.

  Two endpoints are explained in this APIDOC.md
-->

# Name hamsters API Documentation

The goal of this API is to help people decide their hamster name smoothly when
they can't decide it. They can add their own execuses to the data
stored in server side as well as getting names.

## Get a random name

**Request Format:** /choose

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a random hamster name for users.

**Example Request:** /choose

**Example Response:**

```
Kevin
```

**Error Handling:**
N/A

## Provide a hamster name idea for others.

**Request Format:** /add endpoint with POST parameters of `name`

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Given a defined parameter of `name`, it add to data if it's a new one, but not added if the same name already exists.

**Example Request:** /add with POST parameters of `name=Bob`

**Example Response:**

```json
{
  "names": ["Sayu", "Kevin", "Chinari", "Raika", "Haruka", "Risako", "Bob"],
  "count": 1,
  "result": 1
}
```

**Error Handling:**

- Possible 400 (invalid request) errors (in plain text):
  - If missing the parameter `name`, an error is returned with the message: `New name is not defined.`
  - If the length of the parameter `name` is less than 2, an error is returned with the message: `Your name is too short. Please make it less simple!`
