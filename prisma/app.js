const express = require('express')
const app = express()
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})
const PORT = process.env.PORT || 5000

router.get('/personGroupAndAvg', async(req, res) => {
    const gb = await prisma.person.groupBy({ by: ['name'] })
    const avg = await prisma.person.aggregate({ _avg: { age: true } })
    try {
        res.status(200).json({
            groupBy: gb,
            avg
        })

    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })

    }
})

router.get('/findPersonsByQuery', async(req, res) => {
    try {
        const { name, email } = req.query
        const r = await prisma.person.findMany({
            where: {
                OR: [{
                        name: {
                            notIn: [name]
                        }
                    },
                    {
                        email: { in: [email]
                        }
                    }
                ]
            },
            select: {
                age: true,
                id: true,
                name: true
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })

    }
})
router.get('/findPersonById/:personId', async(req, res) => {
    try {
        const { personId } = req.params
        const r = await prisma.person.findFirst({
            where: {
                id: {
                    equals: Number(personId)
                }
            }
        })
        res.status(200).json(r)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Bir hata gerçekleşti' })

    }
})
router.get('/listAllPersons', async(req, res) => {
    try {
        const r = await prisma.person.findMany({
            select: {
                age: true,
                id: true,
                name: true
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })
    }

})

router.post('/createPersons', async(req, res) => {
    try {
        const createMany = await prisma.person.createMany({
            data: [
                { name: 'Bob', email: 'bob@prisma.io' },
                { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
                { name: 'Yewande', email: 'yewande@prisma.io' },
                { name: 'Angelique', email: 'angelique@prisma.io' },
            ],
            skipDuplicates: true,
        })
        res.status(201).json(createMany)
    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })
    }
})
router.post('/createPerson', async(req, res) => {
    try {
        const { email, age, name } = req.body
        console.log(req.body)
        prisma.person.create({
            data: {
                email,
                age,
                name
            }
        }).then((r) => {
            res.status(201).json(r)
            console.log('r', r)
        }).catch((e) => {
            res.status(500).json({ error: 'Bir hata gerçekleşti' })
        })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Bir hata gerçekleşti' })
    }
})

router.delete('/deleteAllPersons', async(req, res) => {
    try {
        const r = await prisma.person.deleteMany({})
        res.status(200).json({ message: 'Tüm personeller silindi' })
    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })
    }
})

router.delete('/deletePersonById/:personId', async(req, res) => {
    try {
        const { personId } = req.params
        const r = await prisma.person.delete({
            where: {
                id: Number(personId)
            }
        })

        // const r = await prisma.person.deleteMany({
        //     where: {
        //         email: {
        //             contains: 'prisma.io'
        //         }
        //     }
        // })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })

    }
})

router.put('/updatePersonById/:personId', async(req, res) => {
    try {
        const { name } = req.body
            // const r = await prisma.person.updateMany({
            //     where: {
            //         email: {
            //             contains: 'prisma.io'
            //         }
            //     },
            //     data: {
            //         name: new Date().toDateString()
            //     }

        // })
        // const r = await prisma.person.upsert({
        //     where: {
        //         email: 'deneme2@mail.com'
        //     },
        //     create: {
        //         name: 'Ayşe',
        //         email: 'deneme2@mail.com'
        //     },
        //     update: {
        //         name: 'Ayşe 3',
        //         email: 'fatma@mail.com'
        //     }
        // })
        const r = await prisma.person.update({
            where: {
                id: Number(req.params.personId)
            },
            data: {
                name: name
            }

        })
        res.json(r)

    } catch (error) {
        res.status(500).json({ error: 'Bir hata gerçekleşti' })

    }
})

router.post('/createStudentWithLesson', (req, res) => {
    // prisma.student.create({
    //     data: {
    //         name: 'Ayşe',
    //         last_name: 'Uçar'
    //     }
    // }).then((r) => {
    //     console.log('r', r)
    //     prisma.lesson.create({
    //         data: {
    //             lesson_name: 'İngilizce',
    //             student_id: r.id
    //         }
    //     }).then((s) => {
    //         console.log('s', s)
    //     })
    // })

    prisma.student.create({
        data: {
            last_name: 'Dalkılıç',
            name: 'Yasin',
            lessons: {
                create: [{
                        lesson_name: 'Türkçe'
                    },
                    {
                        lesson_name: 'Matematik'
                    }
                ]
            }
        },
        include: { lessons: true }
    }).then((r) => {
        res.status(200).json(r)
        console.log('r', r)
    }).catch((e) => {
        console.log('e', e)
    })
})


router.get('/studentWithLessons', (req, res) => {
    prisma.student.findMany({
        include: {
            _count: true,
            lessons: {
                select: {
                    lesson_name: true,
                    id: true
                },

                where: {
                    id: 1
                }
            },
        }
    }).then((r) => {
        res.status(200).json(r)
    })
})

router.put('/studentUpdate', (req, res) => {
    prisma.student.update({
        where: {
            id: 1
        },
        data: {
            lessons: {
                update: {
                    where: {
                        id: 1
                    },
                    data: {
                        lesson_name: "Hello"
                    }
                },
            }
        }
    }).then((r) => {
        res.json(r)
    })
})


router.delete('/studentWithLesson', (req, res) => {
    prisma.student.findFirst({
        where: {
            id: 1
        }
    }).then((r) => {
        prisma.lesson.deleteMany({
            where: {
                student_id: r.id
            }
        }).then((s) => {
            res.status(200).json(s)
        })
    })
})

app.use(express.json())
app.use(router)

const connectToDb = async() => {
        try {
            await prisma.$connect()
            console.log('success')
            app.listen(PORT, () => {
                console.log('running on port 5000')
            })

        } catch (error) {
            console.log('Bir Hata oluştu', error)
        }

    }
    // const disconnectToDb = async() => {
    //     try {
    //         await prisma.$disconnect()
    //         console.log('success disconnect')
    //     } catch (error) {
    //         console.log('Bir Hata oluştu', error)
    //     }
    // }
    // prisma.$on('beforeExit', async() => {
    //     console.log('beforeExit hook')
    // })
prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

const test = async() => {
        // const r = await prisma.post.create({
        //     data: {
        //         title: 'Bu Post 1',
        //         categories: {
        //             create: [{
        //                 assignedAt: new Date(),
        //                 category: {
        //                     create: {
        //                         name: "Kategori 1"
        //                     }
        //                 }
        //             }]
        //         }
        //     }
        // })
        // const r = await prisma.post.create({
        //     data: {
        //         title: 'Bu Post 1',
        //         categories: {
        //             create: [{
        //                     assignedAt: new Date(),
        //                     category: {
        //                         create: {
        //                             name: "Test1"
        //                         }
        //                     }
        //                 },
        //                 {
        //                     category: {
        //                         create: {
        //                             name: "Test2"
        //                         }
        //                     },
        //                     assignedAt: new Date()
        //                 }
        //             ]
        //         }
        //     }
        // })

        const r = await prisma.category.create({
            data: {
                name: "Kategori 100",
                posts: {
                    create: [{
                            assignedAt: new Date(),
                            post: {
                                create: {
                                    title: "Posttur"
                                }
                            }
                        },
                        {
                            assignedAt: new Date(),
                            post: {
                                create: {
                                    title: "Posttur 2"
                                }
                            }
                        }
                    ]
                }
            }
        })
        console.log('r', r)
    }
    //test()


const listManyToMany = async() => {
        // const r = await prisma.categoriesOnPosts.findMany({
        //     include: {
        //         category: true,
        //         post: true
        //     }
        // })
        const r = await prisma.post.findMany({
            include: {
                categories: {
                    where: {
                        categoryId: 4
                    },
                    include: {
                        post: true,
                        category: true
                    }
                }
            }
        })
        console.log('r', r)
    }
    //listManyToMany()


const updateManyToManyData = async() => {
    const r = await prisma.post.update({
        where: {
            id: 2
        },
        data: {
            title: 'Yeni Title',
            categories: {
                update: {
                    where: {
                        postId_categoryId: {
                            categoryId: 2,
                            postId: 2
                        }
                    },
                    data: {
                        assignedAt: new Date(),
                        categoryId: 4
                    }
                }
            }
        }
    })
    console.log('r', r)
}
const deleteManyToManyData = async() => {
        // const r = await prisma.category.update({
        //     where: {
        //         id: 4,
        //     },
        //     data: {
        //         posts: {
        //             deleteMany: {}
        //         }
        //     }

        // })
        const r = await prisma.categoriesOnPosts.delete({
            where: {
                postId_categoryId: {
                    categoryId: 7,
                    postId: 10
                }
            },


        })
        console.log('r', r)
    }
    //deleteManyToManyData()
    //updateManyToManyData()
connectToDb()

const transaction = () => {

    prisma.$transaction([prisma.person.findMany({
        skip: 1,
        take: 5
    })]).then((s) => {
        console.log('s', s)
    }).catch((e) => {
        console.log('e', e)
    })
}

transaction()

const rawQuery = async() => {
    const result = await prisma.$queryRaw `Select * from public."Person" WHERE id = ${8}`
    console.log('result', result)
}
rawQuery()


//https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

//https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting