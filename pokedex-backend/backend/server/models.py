from django.db import models

class Counter(models.Model):
    id = models.BigAutoField(primary_key=True)
    count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Counter'