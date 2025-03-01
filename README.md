# Fortitude API

A simple PoC API for managing character health.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Run](#run)
- [Test](#test)
- [Build](#build)
- [API Documentation](#api-documentation)
  - [Character](#character)
    - [GET `/character/:characterId`](#get-character-characterid)
      - [Example](#example)
    - [POST `/character/:characterId/heal`](#post-character-characterid-heal)
      - [Example](#example-1)
    - [POST `/character/:characterId/damage`](#post-character-characterid-damage)
      - [Example](#example-2)

## Requirements

- Node.js 22+
- pnpm 10+

## Setup

```bash
pnpm install
```

## Run

```bash
pnpm run dev
```

This will start the API on port 3000.

To use a different port, set the `PORT` environment variable.

```bash
PORT=8080 pnpm run dev
```

## Test

```bash
pnpm test
```

## Format

```bash
pnpm format
```

## Build

```bash
pnpm build
```

## Run

```bash
pnpm start
```

This will start the API on port 3000.

To use a different port, set the `PORT` environment variable.

```bash
PORT=8080 pnpm start
```

## API Documentation

### Character

#### GET `/character/:characterId`

Returns a character sheet by ID.

#### Example

```bash
curl http://localhost:3000/character/briv
```

#### POST `/character/:characterId/heal`

Heals a character by a given amount and returns the updated character sheet.

##### Body

```json
{
  "type": "hp", // or "temp_hp"
  "amount": 10 // positive integer
}
```

#### Example

```bash
curl -X POST http://localhost:3000/character/briv/heal \
  -H "Content-Type: application/json" \
  -d '{"type": "hp", "amount": 10}'
```

#### POST `/character/:characterId/damage`

Applies damage to a character by a given amount and returns the updated character sheet. The calculations factors in character resistances, immunities, and vulnerabilities.

##### Body

```json
{
  "type": "bludgeoning", // or "piercing", "slashing", "fire", "cold", "acid", "thunder", "lightning", "poison", "radiant", "necrotic", "psychic", "force"
  "amount": 10 // positive integer
}
```

#### Example

```bash
curl -X POST http://localhost:3000/character/briv/damage \
  -H "Content-Type: application/json" \
  -d '{"type": "bludgeoning", "amount": 10}'
```
