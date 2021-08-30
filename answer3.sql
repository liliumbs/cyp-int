SELECT c.name, count(u.country) AS users_count
FROM countries AS c
LEFT JOIN users as u
ON c.id = u.country
GROUP BY u.country