#!/bin/bash

gh repo list \
  --visibility=public \
  --limit 400 \
  --json "name,description,url,homepageUrl,primaryLanguage,createdAt,stargazerCount,repositoryTopics" \
  --jq 'map(
  (.repositoryTopics // [] | map(.name)) as $topics |
    {
      name,
      description,
      url,
      homepageUrl,
      language: (.primaryLanguage.name // "NA"),
      createdAt,
      stars: .stargazerCount,
      topics: $topics,
      type: (["npm", "cli", "web-extension"] | map(. as $t | select($topics | index($t) != null) | $t) | first // "app")
    }
  )
  ' | jq '
  [.[] | select(.topics | index("pin"))]
  | sort_by(.createdAt)
  | reverse
  | map({
      name,
      url: (if .homepageUrl != "" then .homepageUrl else .url end),
      description,
      roles: [.language],
      startDate: (.createdAt[:7]),
      endDate: (.createdAt[:7]),
      stars,
      keywords: (.topics | map(select(. != "pin")))
    })'
