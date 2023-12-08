<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            showTab: 1,
        }
    },
    methods: {
        changeTab(val) {
            this.showTab = val;
        }
    }
}
</script>

<template>
    <footer class="block_footer">
        <div class="border-bottom py-4">
            <div class="container">
                <div class="d-flex mt-5 pt-2 border-bottom">
                    <ul class="nav nav-underline">
                        <li class="nav-item" @click="changeTab(1)">
                            <h6 class="m-0"><a class="nav-link titol_list_footer me-4 py-3"
                                    :class="{ active: showTab == 1 }">Popolari</a>
                            </h6>

                        </li>
                        <li class="nav-item" @click="changeTab(2)">
                            <h6 class="m-0"><a class="nav-link titol_list_footer me-4 py-3"
                                    :class="{ active: showTab == 2 }">Destinazioni
                                    storiche</a></h6>

                        </li>
                        <li class="nav-item" @click="changeTab(3)">
                            <h6 class="m-0"><a class="nav-link titol_list_footer me-4 py-3"
                                    :class="{ active: showTab == 3 }">Categorie</a>
                            </h6>

                        </li>
                        <li class="nav-item" @click="changeTab(4)">
                            <h6 class="m-0"><a class="nav-link titol_list_footer py-3"
                                    :class="{ active: showTab == 4 }">Attività</a>
                            </h6>
                        </li>
                    </ul>
                </div>
                <div>
                    <div v-if="showTab == 1" class="py-5">
                        <p>Le città popolari, cuori pulsanti di cultura e diversità, sono spesso teatri vivi di esperienze
                            uniche. Strade trafficate, skyline mozzafiato e un frastuono costante creano l'energia
                            distintiva
                            che caratterizza questi centri urbani. Le metropoli sono crocevia di storie, dove le persone si
                            intrecciano e si mescolano, dando vita a un tessuto sociale ricco e variegato.
                            La vivacità delle città popolari si riflette nei loro mercati affollati, nei ristoranti che
                            offrono
                            una festa per il palato e nei monumenti che narrano la storia del passato. In ogni città
                            popolare,
                            si respira un'atmosfera unica che incanta residenti e visitatori, rendendole autentiche perle
                            del
                            mondo moderno.</p>
                    </div>
                    <div v-else-if="showTab == 2" class="py-5">
                        <p>Le destinazioni storiche sono testimoni mutevoli del passato, con le loro antiche strade e
                            monumenti
                            che raccontano storie millenarie. Attraversare questi luoghi è come viaggiare nel tempo,
                            immergendosi nelle epoche che li hanno plasmati. I siti storici sono custodi di segreti e
                            tradizioni, con architetture imponenti e testimonianze archeologiche che narrano la ricca
                            eredità di
                            civiltà passate. Esplorare destinazioni storiche offre un'opportunità unica di connettersi con
                            le
                            radici dell'umanità, ammirando la maestosità di epoche che hanno lasciato un'impronta indelebile
                            sulla storia mondiale. In queste destinazioni, ogni pietra racconta un capitolo, invitando i
                            visitatori a un viaggio intriso di saggezza e meraviglia.</p>
                    </div>
                    <div v-else-if="showTab == 3" class="py-5">
                        <p>I viaggi si declinano in una varietà di categorie, ognuna offrendo esperienze uniche e
                            coinvolgenti.
                            Il turismo culturale consente di immergersi nelle tradizioni e nell'arte di una regione,
                            scoprendo
                            il suo patrimonio storico. I viaggi avventurosi portano alla ricerca di emozioni e sfide,
                            spingendo
                            i confini personali in scenari spettacolari. Il turismo enogastronomico delizia il palato,
                            permettendo di esplorare sapori autentici e prelibatezze locali. I viaggi di relax, invece,
                            offrono
                            un'occasione per ricaricare le energie in luoghi tranquilli e pittoreschi. Infine, il turismo
                            sostenibile promuove un approccio responsabile, rispettando l'ambiente e le comunità locali per
                            un
                            impatto positivo a lungo termine.</p>
                    </div>
                    <div v-else-if="showTab == 4" class="py-5">
                        <p>Nei viaggi, le attività si diversificano per soddisfare una vasta gamma di interessi. Gli amanti
                            della storia possono esplorare siti culturali e musei affascinanti, immergendosi nel passato di
                            luoghi suggestivi. Per gli avventurieri, escursioni, sport estremi e attività all'aria aperta
                            offrono un'adrenalina unica in scenari mozzafiato. I viaggi gastronomici invitano a esplorare le
                            delizie culinarie locali, mentre lo shopping permette di scoprire l'artigianato e i mercati
                            tipici
                            di una regione. Le attività di relax, come spa e passeggiate tranquille, completano
                            l'esperienza,
                            offrendo momenti di riposo e benessere durante il viaggio.</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container border-bottom">
                <div class="py-4 mt-5 mb-3">
                    <div class="row">
                        <div class="col-4">
                            <h6 class="mb-3">Assistenza</h6>
                            <ul>
                                <li class="list_footer"><a href="">Centro Assistenza</a></li>
                                <li class="list_footer"><a href="">Antidiscriminazione</a></li>
                                <li class="list_footer"><a href="">Supporto alla disabilità</a></li>
                                <li class="list_footer"><a href="">Opzioni di cancellazione</a></li>
                                <li class="list_footer"><a href="">Segnala un problema nel quartiere</a></li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h6 class="mb-3">Ospitare</h6>
                            <ul>
                                <li class="list_footer"><a href="">Apri un BoolBnB</a></li>
                                <li class="list_footer"><a href="">Risorse per gli host</a></li>
                                <li class="list_footer"><a href="">Forum della community</a></li>
                                <li class="list_footer"><a href="">Ospitare responsabilmente</a></li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h6 class="mb-3">BoolBnB</h6>
                            <ul>
                                <li class="list_footer"><a href="">Newsroom</a></li>
                                <li class="list_footer"><a href="">Nuove funzionalità</a></li>
                                <li class="list_footer"><a href="">Opportunità di lavoro</a></li>
                                <li class="list_footer"><a href=""></a>Investitori</li>
                                <li class="list_footer"><a href=""></a>Soggiorni con BoolBnB</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="d-flex align-items-center justify-content-between py-4">
                <div class="d-flex">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-c-circle" viewBox="0 0 16 16">
                            <path
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z" />
                        </svg> 2023 <span style="color: #ff385c;">BoolBnB</span>, Inc.</p>
                    <ul class="d-flex">
                        <li style="list-style: none;"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg> <a href="">Privacy</a></li>
                        <li style="list-style: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg><a href=""> Termini</a></li>
                        <li style="list-style: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg><a href="">Mappa del sito</a></li>
                        <li style="list-style: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg><a href=""> Dettagli dell'azienda</a></li>
                    </ul>
                </div>
                <div class="d-flex">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-globe" viewBox="0 0 16 16">
                            <path
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472M3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                        </svg> <strong>Italiano (IT)</strong></p>
                    <ul class="d-flex">
                        <li style="list-style: none;" class="me-4">
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-facebook" viewBox="0 0 16 16" style="color: #ff385c;">
                                    <path
                                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg></a>
                        </li>
                        <li style="list-style: none;" class="me-4">
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-twitter" viewBox="0 0 16 16" style="color: #ff385c;">
                                    <path
                                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15" />
                                </svg></a>
                        </li>
                        <li style="list-style: none;">
                            <a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-instagram" viewBox="0 0 16 16" style="color: #ff385c;">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </footer>
</template>

<style lang="sass" scoped>

</style>